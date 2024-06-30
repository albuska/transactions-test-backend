const express = require("express");
const { ctrlTransactions } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlTransactions.getTransactions);

router.post("/", ctrlTransactions.postTransactions);

router.delete("/:id", ctrlTransactions.removeTransaction);

router.patch("/:id/status", ctrlTransactions.updateStatusTransaction);

module.exports = router;
