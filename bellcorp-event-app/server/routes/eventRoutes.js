const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE EVENT (Protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL EVENTS (Public)
router.get("/", async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEARCH EVENTS BY NAME OR LOCATION
router.get("/search", async (req, res) => {
  try {
    const { name, location } = req.query;

    const where = {};
    if (name) where.name = name;
    if (location) where.location = location;

    const events = await Event.findAll({ where });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE event
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.update(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE event
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.destroy();
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
