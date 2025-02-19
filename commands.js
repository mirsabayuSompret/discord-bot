import { getRPSChoices } from './game.js';
import { capitalize, DiscordRequest } from './utils.js';

export async function HasGuildCommands(appId, guildId, commands) {
  if (guildId === '' || appId === '') return;

  commands.forEach((c) => HasGuildCommand(appId, guildId, c));
}

// Checks for a command
async function HasGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();

    if (data) {
      const installedNames = data.map((c) => c['name']);
      // This is just matching on the name, so it's not good for updates
      if (!installedNames.includes(command['name'])) {
        console.log(`Installing "${command['name']}"`);
        InstallGuildCommand(appId, guildId, command);
      } else {
        
        console.log(`"${command['name']}" command already installed`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Installs a command
export async function InstallGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`
  // install command
  try {
    await DiscordRequest(endpoint, { method: 'POST', body: command });
  } catch (err) {
    console.error(err);
  }
}

// Installs a command
export async function PatchGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands/${command['id']}`;
  // install command
  try {
    await DiscordRequest(endpoint, { method: 'PATCH', body: command });
  } catch (err) {
    console.error(err);
  }
}


// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
export const HELP_COMMAND = {
  name: 'help',
  description: 'show the list of command on this bot',
  type: 1,
};

export const LILY_COMMAND = {
  name : "lily",
  description : "ask lily anything",
  type:1,
}

// build command
export const BUILD_COMMAND = {
  name: 'build',
  description : 'build comamnd for petit island',
  type:1,
};

