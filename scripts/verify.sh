#!/usr/bin/env bash
set -e

echo "Running typecheck..."
npx tsc --noEmit

echo "Running lint..."
npx eslint src

echo "Running unit tests with coverage..."
npx vitest run --coverage

echo "Running build..."
npm run build

echo "All verifications passed!"
