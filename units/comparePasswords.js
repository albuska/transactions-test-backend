const bcrypt = require("bcrypt");

const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Помилка при порівнянні паролів:", error);
    return false;
  }
};

module.exports = comparePasswords;
