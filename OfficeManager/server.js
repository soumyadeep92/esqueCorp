const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("./app/config/passport.js")

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

const db = require("./app/config/sequelize.js");

db.sequelize.sync({force:false})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to office" });
});

require("./app/routes/OfficeRouter.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});