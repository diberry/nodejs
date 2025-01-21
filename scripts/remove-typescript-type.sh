#!/bin/bash
# filepath: /workspaces/nodejs/scripts/remove-typescript.sh

# CAUTION: may not work on TSX files

if [ $# -ne 1 ]; then
  echo "Usage: $0 <file>"
  exit 1
fi

file=$1

# Remove TypeScript-specific syntax
sed -i.bak -E '
  # Remove 'as TYPENAME' notation
  s/[[:space:]]+as[[:space:]]+[a-zA-Z0-9_]+//g;
' "$file"

echo "TypeScript-specific syntax removed from $file. Backup created as $file.bak."