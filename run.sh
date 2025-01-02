#!/bin/bash

option="$1"

# -n "$option": option 있으면 true, 없으면 false -- for local test
if [ -n "$option" ] && [ "$option" == "local" ]
then
  docker run -d -p 3000:3000 --name backend atelier-backend
else
  docker run -d -p 3000:3000 --name backend --restart=always --network atelier_network \
  --log-driver=fluentd \
  --log-opt fluentd-address=localhost \
  --log-opt tag="atelier-backend" \
  atelier-backend
fi
