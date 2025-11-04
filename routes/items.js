const express = require("express");
const router = express.Router();
const pool = require("../db"); // MySQL connection pool

// -------------------------------
// CREATE - Add new item
// POST /items
// -------------------------------
router.post("/", async (req, res) => {
  try {
    const { name, description, quantity, price, category } = req.body;

    if (!name || quantity == null || price == null) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const [result] = await pool.query(
      `INSERT INTO items (name, description, quantity, price, category)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description || null, quantity, price, category || null]
    );

    res.status(201).json({
      message: "Item created successfully.",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Error inserting item:", err);
    res.status(500).json({ error: "Failed to create item." });
  }
});

// -------------------------------
// READ - Get all items
// GET /items
// -------------------------------
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, description, quantity, price, category
       FROM items
       ORDER BY id ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: "Failed to retrieve items." });
  }
});

// -------------------------------
// READ - Get single item by ID
// GET /items/:id
// -------------------------------
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, description, quantity, price, category
       FROM items
       WHERE id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ error: "Failed to retrieve item." });
  }
});

// -------------------------------
// UPDATE - Edit an existing item
// PUT /items/:id
// -------------------------------
router.put("/:id", async (req, res) => {
  try {
    const { name, description, quantity, price, category } = req.body;

    if (!name || quantity == null || price == null) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const [result] = await pool.query(
      `UPDATE items
       SET name = ?, description = ?, quantity = ?, price = ?, category = ?
       WHERE id = ?`,
      [name, description || null, quantity, price, category || null, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found." });
    }

    res.json({ message: "Item updated successfully." });
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: "Failed to update item." });
  }
});

// -------------------------------
// DELETE - Remove an item
// DELETE /items/:id
// -------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM items WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Item not found." });
    }

    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "Failed to delete item." });
  }
});

module.exports = router;
