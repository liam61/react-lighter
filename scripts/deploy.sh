#!/bin/sh

git clone git@omyleon.com:/home/git/repos/react-lighter.git .deploy_git
cp -r dist/* .deploy_git/
