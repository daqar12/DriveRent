const Log = require("../models/Log");

// GET all logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("user_id", "name email");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single log
exports.getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id)
      .populate("user_id", "name email");
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new log
exports.createLog = async (req, res) => {
  try {
    const newLog = new Log(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE log
exports.deleteLog = async (req, res) => {
  try {
    const deletedLog = await Log.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: "Log not found" });
    res.json({ message: "Log deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
