import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
});

const app = express();
app.use(cors());
app.use(express.json());

// ── Transport ──────────────────────────────────────────────────────────────────
app.get("/api/transport", async (req, res) => {
  try {
    const type = req.query.type || "cng";
    const ALLOWED = ["cng", "bus", "train"];
    if (!ALLOWED.includes(type)) return res.status(400).json({ error: "Invalid type" });
    const { rows } = await pool.query("SELECT * FROM transport_routes WHERE route_type = $1 ORDER BY id", [type]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Accommodations ─────────────────────────────────────────────────────────────
app.get("/api/accommodations", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM accommodations ORDER BY verified DESC, rating DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Restaurants ────────────────────────────────────────────────────────────────
app.get("/api/restaurants", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM restaurants ORDER BY verified DESC, rating DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Attractions ────────────────────────────────────────────────────────────────
app.get("/api/attractions", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM attractions ORDER BY is_hidden_gem, rating DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Community Posts ────────────────────────────────────────────────────────────
app.get("/api/community", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM community_posts ORDER BY created_at DESC LIMIT 50");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/community", async (req, res) => {
  try {
    const { user_name, post_type, location, content, is_warning } = req.body;
    if (!content || !location) return res.status(400).json({ error: "content and location required" });
    const { rows } = await pool.query(
      "INSERT INTO community_posts (user_name, post_type, location, content, upvotes, is_warning) VALUES ($1, $2, $3, $4, 0, $5) RETURNING *",
      [user_name || "Anonymous", post_type || "update", location, content, !!is_warning]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/community/:id/upvote", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "invalid id" });
    const { rows } = await pool.query(
      "UPDATE community_posts SET upvotes = upvotes + 1 WHERE id = $1 RETURNING upvotes",
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Trip Plans ─────────────────────────────────────────────────────────────────
app.post("/api/trip-plan", async (req, res) => {
  try {
    const { destination, start_date, end_date, budget, group_size } = req.body;
    if (!destination || !budget) return res.status(400).json({ error: "destination and budget required" });
    const { rows } = await pool.query(
      "INSERT INTO trip_plans (destination, start_date, end_date, budget, group_size) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [destination, start_date || null, end_date || null, budget, group_size || 2]
    );
    res.status(201).json({ id: rows[0].id, message: "Trip plan saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Health ─────────────────────────────────────────────────────────────────────
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "connected" });
  } catch {
    res.status(503).json({ status: "error", db: "disconnected" });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ SylhetGo API running on port ${PORT}`);
});
