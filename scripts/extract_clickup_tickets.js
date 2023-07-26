// scripts/extract_clickup_tickets.js

const fs = require('fs');

function extractClickUpTickets(prDescription, prTitle) {
  const clickUpTicketRegex = /#(\d+)/g;
  const descriptionMatches = prDescription.match(clickUpTicketRegex) || 
[];
  const titleMatches = prTitle.match(clickUpTicketRegex) || [];
  const allMatches = [...new 
Set(descriptionMatches.concat(titleMatches))]; // Remove duplicate matches

  return allMatches.map((match) => match.replace('#', ''));
}

async function run() {
  try {
    const prDescription = fs.readFileSync(process.env.GITHUB_EVENT_PATH, 
'utf8');
    const prTitle = process.env.GITHUB_HEAD_REF || ''; 
    // Assumes the PR title is available as the branch name
    const ticketNumbers = extractClickUpTickets(prDescription, prTitle);

    fs.writeFileSync('clickup-tickets.txt', ticketNumbers.join('\n'));
  } catch (error) {
    console.error('Error occurred while extracting ClickUp tickets:', 
error);
    process.exit(1);
  }
}

run();

