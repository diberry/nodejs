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
  # Remove type annotations
  s/:[[:space:]]*[a-zA-Z0-9_]+//g;
  # Remove interface declarations
  /interface[[:space:]]+[a-zA-Z0-9_]+[[:space:]]*\{/d;
  # Remove type declarations
  /type[[:space:]]+[a-zA-Z0-9_]+[[:space:]]*=/d;
  # Remove import type statements and everything up to the semicolon or closing curly bracket
  /import[[:space:]]+type[[:space:]]+[^;]*[;}]?/d;
  # Remove implements keyword
  s/implements[[:space:]]+[a-zA-Z0-9_,[:space:]]+//g;
  # Remove readonly keyword
  s/readonly[[:space:]]+//g;
  # Remove optional properties
  s/\?[[:space:]]*:/:/g;
  # Remove content within angle brackets unless it is JSX
  s/<[^>]+>//g;
  # Remove 'as TYPENAME' notation
  s/[[:space:]]+as[[:space:]]+[a-zA-Z0-9_]+//g;
' "$file"

echo "TypeScript-specific syntax removed from $file. Backup created as $file.bak."