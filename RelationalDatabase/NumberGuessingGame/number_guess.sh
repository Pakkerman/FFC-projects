#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo "Enter your username:"

# get username
USER_NAME=
while [[ -z $USER_NAME || $USER_NAME =~ .{22,} ]]; do
  echo "username: $USER_NAME"
  read USER_NAME
done

USER_RESULT=$($PSQL "select user_id, name from users where name = '$USER_NAME'")
# if no user
if [[ -z $USER_RESULT ]]; then
  # insert user
  USER_INSERT_RESULT=$($PSQL "insert into users (name) values ('$USER_NAME')")
  USER_RESULT=$($PSQL "select user_id, name from users where name = '$USER_NAME'")
  # greet with first time message
  IFS="|" read USER_ID USERNAME <<< $(echo "$USER_RESULT")
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
else
  # user already exist
  # get user data
  IFS="|" read USER_ID USERNAME <<< $(echo "$USER_RESULT")
  GAMES_PLAYED=$($PSQL "select count(*) from games where user_id = $USER_ID")
  BEST_GAME=$($PSQL "select min(guesses_taken) from games where user_id = $USER_ID")
  echo -e "\nWelcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

echo "Guess the secret number between 1 and 1000:"

# guessing loop
RANDOM_NUMBER=$(( RANDOM % 1001 ))
USER_GUESS=
GUESSED_COUNT=0
while true; do
  (( GUESSED_COUNT ++ ))

  # check guess and continue early if is not digit or wrong guess
  read USER_GUESS
  [[ $USER_GUESS =~ [^0-9] ]] && echo "That is not an integer, guess again:" && continue
  (( $USER_GUESS < $RANDOM_NUMBER )) && echo "It's higher than that, guess again:" && continue
  (( $RANDOM_NUMBER < $USER_GUESS )) && echo "It's lower than that, guess again:" && continue


  if [[ $USER_GUESS -eq $RANDOM_NUMBER ]]; then
    INSERT_GAME_RESULT=$($PSQL "insert into games (user_id, guesses_taken) values ($USER_ID, $GUESSED_COUNT)")
    echo "You guessed it in $GUESSED_COUNT tries. The secret number was $RANDOM_NUMBER. Nice job!" && break
  fi
done
