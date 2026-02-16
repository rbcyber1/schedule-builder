#!/bin/bash
set -e

DIR="/git/root/directory/here"

cd $DIR
git fetch origin
git reset --hard origin/main
npm i
cd $DIR/client
npm i
cd $DIR/server
npm i
cd $DIR
npm run build
