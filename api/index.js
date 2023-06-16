const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
  'mongodb+srv://ervandharutyunyan06096:eroero96@cluster0.246qmv9.mongodb.net/',
  { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("database is connected successfully");
});

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  veryfied: { type: Boolean, required: false },
});

module.exports = mongoose.model("User", userSchema);

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/signup", function (req, res) {
  const { email, password } = req.body;

  const user = new User({ email, password });

  user.save(function (err) {
    if (err) {
      return res.status(422).json({ error: "Unable to create user" });
    }

    res.json({ message: "User created successfully" });
  });
});

// Route to log in a user
app.post("/login", function (req, res) {
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({ email, password }, function (err, user) {
    console.log({ email, password }, ">>>>>>>>>>>");
    if (err) {
      return res.status(422).json({ error: "Unable to log in" });
    }

    if (!user) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    // Compare the password
    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return res.status(422).json({ error: "Unable to log in" });
      }

      if (!isMatch) {
        return res.status(422).json({ error: "Invalid email or password" });
      }

      res.json({ message: "Logged in successfully" });
    });
  });
});

const PORT = process.env.PORT ?? 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});
