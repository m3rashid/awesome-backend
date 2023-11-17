#!/bin/bash

echo "Watching shared..."
rm -rf mobile/node_modules/@awesome || true
mkdir -p mobile/node_modules/@awesome
cp -r shared mobile/node_modules/@awesome
echo "Done!"
