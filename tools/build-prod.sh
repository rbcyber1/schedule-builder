#!/bin/bash
set -e

DIR="/git/root/directory/here"

cd $DIR
git fetch origin
git reset --hard origin/main
npm run build
