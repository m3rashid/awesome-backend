#!/bin/bash

declare -a folders=( "node_modules" ".next" "build" "dist" ".turbo" ".docusaurus" ".svelte-kit" ".swc")

for i in "${folders[@]}"
do
  find . -name "$i" -type d -prune -exec rm -rf '{}' +
done

