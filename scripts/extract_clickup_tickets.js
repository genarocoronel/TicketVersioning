const fs = require('fs');

function extractClickUpTickets(prDescription, prTitle) {
  const clickUpTicketRegex = /#(\d+)/g;
  const descriptionMatches = prDescription.match(clickUpTicketRegex) || [];
  const titleMatches = prTitle.match(clickUpTicketRegex) || [];
  const allMatches = [...new Set(descriptionMatches.concat(titleMatches))]; // Remove duplicate matches

  return allMatches.map((match) => match.replace('#', ''));
}

function extractFirstLines(prDescription) {
  // Extract the first line of the PR description
  const firstLines = prDescription.trim().split('\n').map((line) => line.trim()).filter(Boolean);
  return firstLines;
}

function generateClickUpLinks(ticketNumbers) {
  // Assuming your ClickUp tasks are hosted at 'https://app.clickup.com/t/'
  const clickUpBaseUrl = 'https://app.clickup.com/t/';
  const clickUpLinks = ticketNumbers.map((ticket) => `${clickUpBaseUrl}${ticket}`);
  return clickUpLinks;
}

async function run() {
  try {
    const prDescription = fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8');
    const prTitle = process.env.GITHUB_HEAD_REF || ''; // Assumes the PR title is available as the branch name
    const ticketNumbers = extractClickUpTickets(prDescription, prTitle);
    const firstLines = extractFirstLines(prDescription);
    const clickUpLinks = generateClickUpLinks(ticketNumbers);

    fs.writeFileSync('clickup-tickets.txt', ticketNumbers.join('\n'));
    fs.writeFileSync('pr-first-lines.txt', firstLines.join('\n'));
    fs.writeFileSync('clickup-links.txt', clickUpLinks.join('\n'));
  } catch (error) {
    console.error('Error occurred while extracting ClickUp tickets:', error);
    process.exit(1);
  }
}

run();
