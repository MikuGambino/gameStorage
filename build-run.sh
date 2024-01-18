#!/bin/bash

# firewall
sudo firewall-cmd --add-port=8181/tcp
sudo firewall-cmd --reload

# check for the docker installation
bash docker.sh

# run docker
sudo systemctl enable docker
sudo systemctl start docker

# build an image
sudo docker build -t gamestorage .

# run compose
sudo docker compose up

