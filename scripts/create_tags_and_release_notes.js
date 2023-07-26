// scripts/create_tags_and_release_notes.js

const fs = require('fs');

function generateVersionTag(ticketNumbers) {
  return `v1.0.0-clickup-${ticketNumbers.join('-')}`;
}

function generateReleaseNotes(ticketNumbers) {
  // In a real scenario, you might want to fetch additional details for each ticket
  // from ClickUp API or other sources to generate comprehensive release notes.
  // For this example, we'll generate simple release notes with ticket numbers.
  const releaseNotesContent = ticketNumbers.map((ticket) => `- Fix issue #${ticket}`).join('\n');
  return `# Release Notes\n\n${releaseNotesContent}`;
}

async function run() {
  try {
    const ticketNumbers = fs.readFileSync('clickup-tickets.txt', 'utf8').trim().split('\n');

    const versionTag = generateVersionTag(ticketNumbers);
    fs.writeFileSync('version.txt', versionTag);

    const releaseNotes = generateReleaseNotes(ticketNumbers);
    fs.writeFileSync('release-notes.md', releaseNotes);
  } catch (error) {
    console.error('Error occurred while creating tags and release notes:', error);
    process.exit(1);
  }
}

run();
