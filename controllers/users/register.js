const {
  createHashPassword,
  comparePasswords,
  getToken,
} = require("../../units");
const { usersDB } = require("../../database");

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    usersDB.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, row) => {
        if (err) {
          console.error("Database error:", err.message);
          return res.status(500).json({ message: "Database error" });
        }

        if (row) {
          try {
            const passwordMatch = await comparePasswords(
              password,
              row.password
            );
            if (passwordMatch) {
              const token = await getToken(row.id);
              res.status(200).json({
                token,
                email: row.email,
              });
            } else {
              console.error("Authentication error: Invalid password");
              res.status(401).json({ message: "Authentication failed" });
            }
          } catch (error) {
            console.error("Compare password error:", error);
            res
              .status(500)
              .json({ message: "Authentication error", error: error.message });
          }
        } else {
          try {
            const hashedPassword = await createHashPassword(password);
            const token = await getToken();

            usersDB.run(
              "INSERT INTO users (email, password, token) VALUES (?, ?, ?)",
              [email, hashedPassword, token],
              function (err) {
                if (err) {
                  if (err.message.includes("UNIQUE constraint failed")) {
                    console.error(
                      "Registration error: Email already registered"
                    );
                    return res
                      .status(409)
                      .json({ message: "Email already registered" });
                  }
                  console.error("Registration error:", err.message);
                  return res.status(500).json({
                    message: "User registration failed",
                    error: err.message,
                  });
                }

                console.log("User registered successfully:", email);
                res.status(201).json({
                  token,
                  email,
                });
              }
            );
          } catch (error) {
            console.error("Hash password error:", error);
            res.status(500).json({
              message: "User registration failed",
              error: error.message,
            });
          }
        }
      }
    );
  } catch (error) {
    console.error("Catch block error:", error);
    res
      .status(500)
      .json({ message: "User registration failed", error: error.message });
  }
};

module.exports = {
  register,
};
