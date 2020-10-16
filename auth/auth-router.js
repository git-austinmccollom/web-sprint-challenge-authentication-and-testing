const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dbFun = require("./auth-db-functions");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./secrets.js");

router.post("/register", (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  dbFun
    .addUser(credentials)
    .then((dbRes) => {
      res.status(201).json(dbRes);
    })
    .catch((dbErr) => {
      res.status(500).json(dbErr);
    });
});

function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
      role: user.role
  }

  const options = {
      expiresIn: '1h'
  };

  return jwt.sign(payload, jwtSecret, options)
}

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log("username", username, "password", password)

  dbFun.findByUsername(username).first()
  // dbFun.findById(2)
  .then((user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      // res.status(200).json({ message: `Welcome ${user.username}!` });
      const token = generateToken(user);
      res
        .status(200)
        .json({
          message: `Welcome: ${user.username}! you have a token`,
          token,
        });
    } else {
      res.status(401).json({ error: "You shall not pass!" });
    }
  })
  .catch((error) => {
    res.status(500).json({ message: "Mystery Error!", error});
  });
});

router.get("/users", (req, res) => {
  dbFun.getUsers()
  .then((dbRes) => {
    res.status(200).json(dbRes);
  })
  .catch((dbErr) => {
    res.status(500).json(dbErr);
  });
})

module.exports = router;
