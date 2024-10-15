const { execSync } = require('child_process');
const oldVersion = require('./package.json').version;
execSync(`git add . && git commit -m "release patch ${oldVersion} (last version)"`);
execSync('npm version patch');
const version = require('./package.json').version;
execSync(`git add . && git commit -m "release ${version}"`);
execSync(`git tag v${version}`);
execSync('git push');