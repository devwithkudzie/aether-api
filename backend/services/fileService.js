const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

const readData = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If file doesn't exist, create it with empty users array
      await fs.writeFile(dataPath, JSON.stringify({ users: [] }));
      return { users: [] };
    }
    throw error;
  }
};

const writeData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

module.exports = {
  readData,
  writeData,
}; 