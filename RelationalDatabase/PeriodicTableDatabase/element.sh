#!/bin/bash


if [[ -z $1 ]]; then 
  echo "Please provide an element as an argument."
else 
  PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

  ATOMIC_NUMBER=$1
  LOOKUP_USING_NAME_RESULT=$($PSQL "select atomic_number from elements where name = '$1'")
  LOOKUP_USING_SYMBOL_RESULT=$($PSQL "select atomic_number from elements where symbol = '$1'")

  [[ ! -z $LOOKUP_USING_NAME_RESULT ]] && ATOMIC_NUMBER=$LOOKUP_USING_NAME_RESULT
  [[ ! -z $LOOKUP_USING_SYMBOL_RESULT ]] && ATOMIC_NUMBER=$LOOKUP_USING_SYMBOL_RESULT

  RESULT=$($PSQL "select type, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius from elements full join properties using (atomic_number) full join types using (type_id) where atomic_number = $ATOMIC_NUMBER;")

  if [[ -z $RESULT ]]; then
    echo "I could not find that element in the database."
  else

  IFS="|" read TYPE SYMBOL NAME ATOMIC_MASS MELTING_POINT_CELSIUS BOILING_POINT_CELSIUS <<< $(echo $RESULT)

  echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT_CELSIUS celsius and a boiling point of $BOILING_POINT_CELSIUS celsius."
  fi
fi
