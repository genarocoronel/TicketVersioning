// scripts/push_tags_and_release_notes.js

const fs = require('fs');
const { execSync } = require('child_process');

async function run() {
  try {
    const versionTag = fs.readFileSync('version.txt', 'utf8').trim();

    execSync('git config --local user.email "action@github.com"');
    execSync('git config --local user.name "GitHub Action"');

    execSync(`git tag -a ${versionTag} -F release-notes.md`);
    execSync('git push origin --tags');
  } catch (error) {
    console.error('Error occurred while pushing tags and release notes:', error);
    process.exit(1);
  }
}

run();
