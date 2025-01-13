const bcrypt = require('bcryptjs');
const { readData, writeData } = require('../services/fileService');

class User {
  static async findOne(query) {
    const data = await readData();
    return data.users.find(user => user.email === query.email);
  }

  static async create(userData) {
    const data = await readData();
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    await writeData(data);
    
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User; 