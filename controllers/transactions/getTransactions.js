const { ctrlWrapper } = require("../../helpers");
const { transactionsDB } = require("../../database");

const getTransactions = async (req, res) => {
   try {
     transactionsDB.all(`SELECT * FROM transactions`, (err, rows) => {
       if (err) {
         console.error("Get transactions error:", err.message);
         return res.status(500).json({
           message: "Failed to retrieve transactions",
           error: err.message,
         });
       }

       res.status(200).json(rows);
     });
   } catch (error) {
     console.error("Get transactions error:", error);
     res.status(500).json({
       message: "Failed to retrieve transactions",
       error: error.message,
     });
   }
};

module.exports = {
  getTransactions: ctrlWrapper(getTransactions),
};
