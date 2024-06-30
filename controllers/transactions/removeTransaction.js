const { httpError, ctrlWrapper } = require("../../helpers");
const { transactionsDB } = require("../../database");

const removeTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    transactionsDB.run(
      `DELETE FROM transactions WHERE transactionid = ?`,
      [id],
      function (err) {
        if (err) {
          console.error("Delete transaction error:", err.message);
          return res.status(500).json({
            message: "Failed to delete transaction",
            error: err.message,
          });
        }

        if (this.changes === 0) {
          return res.status(404).json({ message: "Transaction not found" });
        }

        console.log("Transaction deleted successfully:", id);
        res.status(200).json({ message: "Transaction deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Remove transaction error:", error);
    res.status(500).json({
      message: "Failed to remove transaction",
      error: error.message,
    });
  }
};

module.exports = {
  removeTransaction: ctrlWrapper(removeTransaction),
};
