const express = require("express");
const router = express.Router();
const {
  getAllLogs,
  getLogById,
  createLog,
  deleteLog
} = require("../controllers/logController");

// CRUD routes (logs are usually append-only)
router.get("/", getAllLogs);
router.get("/:id", getLogById);
router.post("/", createLog);
router.delete("/:id", deleteLog);

module.exports = router;
