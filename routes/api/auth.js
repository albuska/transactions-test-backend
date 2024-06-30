const express = require("express");
const { ctrlUsers } = require("../../controllers");

const router = express.Router();

router.post("/register", ctrlUsers.register);

router.post("/logout", ctrlUsers.logout);

module.exports = router;
