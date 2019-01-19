#!/bin/bash

IP=$1

URL1="http://$IP/empty"
URL2="http://$IP/books/1"
URL3="http://$IP/books"

sleep 5
wrk -d5m -c500 -t2 $URL1
sleep 5
wrk -d5m -c500 -t2 $URL2
sleep 5
wrk -d5m -c500 -t2 $URL3