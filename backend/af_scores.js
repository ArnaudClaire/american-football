const express = require('express');
const cors = require('cors');
const calculatePossibilities = require('./calculatePossibilities');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/calculate-possibilities', (req, res) => {
  console.log(req.body);
  const { teamX, teamY } = req.body;
  const possibilities = calculatePossibilities(teamX, teamY);
  res.json(possibilities);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
