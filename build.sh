#!/bin/bash

option="$1"

if [ "$option" = "prod" ]
then
  docker build -f Dockerfile.prod -t atelier-backend .
elif [ "$option" = "dev" ]
then
  docker build -f Dockerfile.dev -t atelier-backend .
else
  echo "input => ./build.sh [dev | prod]"
fi
