#!/bin/bash
git add .
git commit -m "prerealse commit"
npm version patch
git add package.json
git commit -m "patch version"
git push