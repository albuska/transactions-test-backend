const { ctrlWrapper } = require("../../helpers");
const { transactionsDB } = require("../../database");

const postTransactions = async (req, res) => {
  const transactions = req.body;

  try {
    transactionsDB.run(`DELETE FROM transactions`, (err) => {
      if (err) {
        console.error("Error clearing transactions table:", err.message);
        return res.status(500).json({
          message: "Failed to clear transactions table",
          error: err.message,
        });
      }

      transactions.forEach((transaction) => {
        const { transactionid, status, type, clientname, amount } = transaction;

        transactionsDB.run(
          `INSERT INTO transactions (transactionid, status, type, clientname, amount) VALUES (?, ?, ?, ?, ?)`,
          [transactionid, status, type, clientname, amount],
          function (err) {
            if (err) {
              console.error("Insert transaction error:", err.message);
              return res.status(500).json({
                message: "Failed to insert transaction",
                error: err.message,
              });
            }

            console.log("Transaction inserted successfully:", this.lastID);
          }
        );
      });

      res.status(201).json({
        transactions: transactions.map((transaction) => ({
          id: this.lastID,
          ...transaction,
        })),
      });
    });
  } catch (error) {
    console.error("Post transactions error:", error);
    res.status(500).json({
      message: "Failed to post transactions",
      error: error.message,
    });
  }
};

module.exports = {
  postTransactions: ctrlWrapper(postTransactions),
};
