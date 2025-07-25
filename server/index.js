require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
// const { expressjwt: jwt } = require('express-jwt');
// const jwksRsa = require('jwks-rsa');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

// Auth0 JWT middleware
// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// });




// Routes

// Test public route
//azure setup done
app.get('/', (req, res) => {
  res.send(`Todo API is running dtest ${process.env.AUTH0_AUDIENCE}`);

});

// Protected route examples
app.get('/api/todos', async (req, res) => {

  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

// Add a todo
app.post('/api/todos', async (req, res) => {
  const { title } = req.body;

  if (!title) return res.status(400).send('Title is required');

  try {
    const [result] = await pool.query('INSERT INTO todos (title, completed) VALUES (?, false, ?)', [title]);
    res.status(201).json({ id: result.insertId, title, completed: false });
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  const { title, completed } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
      [title, completed, todoId]
    );

    if (result.affectedRows === 0) return res.status(404).send('Todo not found');
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [todoId]);
    if (result.affectedRows === 0) return res.status(404).send('Todo not found');
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
