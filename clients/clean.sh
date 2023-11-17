#!/bin/bash

declare -a folders=( "node_modules" ".next" "build" "dist" ".swc")

for i in "${folders[@]}"
do
  find . -name "$i" -type d -prune -exec rm -rf '{}' +
done
