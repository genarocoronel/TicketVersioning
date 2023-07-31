const fs = require('fs');

function extractClickUpTickets(prDescription, prTitle) {
  const clickUpTicketRegex = /ClickUp Ticket: https:\/\/app.clickup.com\/t\/(\d+)/g;
  const descriptionMatches = prDescription.match(clickUpTicketRegex) || [];
  const titleMatches = prTitle.match(clickUpTicketRegex) || [];
  const allMatches = [...new Set(descriptionMatches.concat(titleMatches))]; // Remove duplicate matches

  return allMatches.map((match) => match.replace('ClickUp Ticket: https://app.clickup.com/t/', ''));
}

function extractFirstLines(prDescription) {
  // Extract the first line of the PR description
  const firstLines = prDescription.trim().split('\n').map((line) => line.trim()).filter(Boolean);
  return firstLines;
}

async function run() {
  try {
    const prDescription = fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8');
    const prTitle = process.env.GITHUB_HEAD_REF || ''; // Assumes the PR title is available as the branch name
    const ticketNumbers = extractClickUpTickets(prDescription, prTitle);
    const firstLines = extractFirstLines(prDescription);
    console.log('PR Description:', prDescription);
    console.log('PR Title:', prTitle);
    console.log('Extracted Ticket Numbers:', ticketNumbers);
    
  
    return allMatches.map((match) => match.replace('#', ''));
  } catch (error) {
    console.error('Error occurred while extracting ClickUp tickets:', error);
    process.exit(1);
  }
}

run();
