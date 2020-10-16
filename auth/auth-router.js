const router = require('express').Router();
const bcrypt = require('bcryptjs');
const dbFun = require('./auth-db-functions');
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secrets.js")

router.post('/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  dbFun.addUser(credentials)
  .then((dbRes) => {
    res.status(200).json(dbRes);
  })
  .catch((dbErr) => {
    res.status(500).json(dbErr);
  });
});

// router.post('/login', (req, res) => {
//   let { username, password } = req.body;

//   dbFun.findByUsername(username)
//   .then((user)) => 
// });

module.exports = router;
