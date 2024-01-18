#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --no-align -t -c"

echo -e "\n~~ Welcome to The Salon ~~\n"

SERVICES=$($PSQL "select * from services;")  
# service menu
while true; do
  # print menu
  echo "$SERVICES" | while IFS="|" read SERVICE_ID SERVICE_NAME; do
    echo "$SERVICE_ID) $SERVICE_NAME"
  done
  echo -e "\nPlease choose a service: "

  # get service id
  read SERVICE_ID_SELECTED
  SERVICE_ID=$($PSQL "select service_id from services where service_id = $SERVICE_ID_SELECTED ")
  # if invalid service
  [[ ! -z $SERVICE_ID ]] && break
done

# get number
echo "Please enter your phone number:"
read CUSTOMER_PHONE 
COSTUMER_RESULT=$($PSQL "select * from customers where phone = '$CUSTOMER_PHONE'")
# if no number
if [[ -z $COSTUMER_RESULT ]]; then
  echo "Please enter your name:"
  # get name
  read CUSTOMER_NAME 
  # insert new user
  INSERT_CUSTOMER_RESULT=$($PSQL "insert into customers (name, phone) values ('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
  [[ $INSERT_CUSTOMER_RESULT == "INSERT 0 1" ]] && echo "New customer added"
fi

# get appointment time
while true; do
  echo "Please pick a time for your appointment:"
  read SERVICE_TIME 

  # format time input
  [[ $SERVICE_TIME =~ ^[0-9]{2}:[0-9]{2}$ ]] 
  [[ $SERVICE_TIME =~ ^[0-9]{1,2}am$ ]] && SERVICE_TIME=$(echo $SERVICE_TIME | sed 's/am/:00/') 
  [[ $SERVICE_TIME =~ ^[0-9]{1,2}pm$ ]] && SERVICE_TIME=$(echo $SERVICE_TIME | sed 's/pm//') && SERVICE_TIME=$(( $SERVICE_TIME + 12 )):00 

  # get customer id and name
  IFS="|" read CUSTOMER_ID CUSTOMER_NAME <<< $($PSQL "select customer_id, name from customers where phone = '$CUSTOMER_PHONE'")
  # insert appointment
  INSER_APPOINTMENT_RESULT=$($PSQL "insert into appointments (customer_id, service_id, time) values ($CUSTOMER_ID, $SERVICE_ID, '$SERVICE_TIME')")
  # if successfully inserted
  if [[ $INSER_APPOINTMENT_RESULT == 'INSERT 0 1' ]]; then
    # get service name
    IFS="|" read SERVICE_NAME <<< $($PSQL "select name from services where service_id = '$SERVICE_ID'")
    # print appointment summary
    echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
    break
  fi
done


echo "EOS"
