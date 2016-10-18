#!/bin/bash

project=$1

if [ -z $project ]; then
  echo "github project name is required but is empty, later"
  exit -1
fi

project_dir="repos/$project"
cwd=`pwd`

rm -rf repos
git clone git@github.com:FiresqueakLLC/$project.git $project_dir
cp -r lib site $project_dir

cd $project_dir
git add .
git commit -m 'updates to lib and site'
git push origin master

cd $cwd
