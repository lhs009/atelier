#!/bin/bash
git checkout main && \

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 996176317807.dkr.ecr.ap-northeast-2.amazonaws.com && \

docker build -f Dockerfile.prod -t atelier-backend . && \

docker tag atelier-backend:latest 996176317807.dkr.ecr.ap-northeast-2.amazonaws.com/atelier-backend:latest && \

docker push 996176317807.dkr.ecr.ap-northeast-2.amazonaws.com/atelier-backend:latest
