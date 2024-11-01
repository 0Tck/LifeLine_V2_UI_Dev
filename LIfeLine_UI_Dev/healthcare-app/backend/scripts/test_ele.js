const bcrypt = require('bcrypt');

async function generateHash(password) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Your hashed password is:');
    console.log(hash);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

// Replace 'your_password_here' with the actual password you want to use
generateHash('admin123');