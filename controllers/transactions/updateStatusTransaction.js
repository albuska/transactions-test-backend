const { ctrlWrapper } = require("../../helpers");
const { transactionsDB } = require("../../database");

const updateStatusTransaction = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    transactionsDB.run(
      `UPDATE transactions SET status = ? WHERE transactionid = ?`,
      [status, id],
      function (err) {
        if (err) {
          console.error("Update transaction status error:", err.message);
          return res.status(500).json({
            message: "Failed to update transaction status",
            error: err.message,
          });
        }

        if (this.changes === 0) {
          return res.status(404).json({ message: "Transaction not found" });
        }

        console.log("Transaction status updated successfully:", id);
        res
          .status(200)
          .json({ message: "Transaction status updated successfully" });
      }
    );
  } catch (error) {
    console.error("Update transaction status error:", error);
    res.status(500).json({
      message: "Failed to update transaction status",
      error: error.message,
    });
  }
};

module.exports = {
  updateStatusTransaction: ctrlWrapper(updateStatusTransaction),
};
