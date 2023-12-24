#!/bin/bash

declare -a folders=( "node_modules" "build" "dist" ".swc" ".gradle")

for i in "${folders[@]}"
do
  find . -name "$i" -type d -prune -exec rm -rf '{}' +
done
