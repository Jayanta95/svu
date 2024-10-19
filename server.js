require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Query to find the user by email
  const query = 'SELECT * FROM user WHERE email= ?';
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length > 0) {
      const user = result[0];
      // console.log(password,user.pass_word);
      // Compare the provided password with the hashed password in the database
      // const match = await bcrypt.compare(password, user.pass_word);
      // console.log(match);
      if (password === user.pass_word) {
        console.log('matched.');
        // Generate a JWT token if the password matches
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        res.json({ token });
      } else {
        console.log('not matched.');
        res.status(401).json({ error: 'Invalid Credentials' });
      }
    } else {
      console.log('wrong.');
      res.status(404).json({ error: 'User Not Found' });
    }
  });
});

app.post('/submit-form', (req, res) => {
  console.log('called.');
  const {
    currentDate=`${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`,
    facultyName,
    dropdown1,
    dropdown2,
    subject,
    Total_Students,
    Present_Students,
    startHour,
    startMinute,
    startAmPm,
    endHour,
    endMinute,
    endAmPm,
    remarks,
    
    
  } = req.body;

  const query = `
  INSERT INTO ClassConduction 
  (Date, Faculty_Name, Department, Semester, Subject, \`Total Present\`, \`Present Student\`, \`Start Time\`, \`End Time\`, Remark)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const startTime = `${startHour}:${startMinute} ${startAmPm}`;
const endTime = `${endHour}:${endMinute} ${endAmPm}`;

db.query(
  query,
  [currentDate, facultyName, dropdown1, dropdown2, subject, Total_Students, Present_Students, startTime, endTime, remarks],
  (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  }
);
});





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
