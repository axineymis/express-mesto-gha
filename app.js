const express = require("express");

const { PORT = 3000 } = process.env;

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: "626260ffc29930fc19f160c4",
  };

  next();
});
app.use("/users", require("./routes/users"));

app.use("/cards", require("./routes/cards"));

app.all("*", (req, res) => {
  console.log("ok");
  res.status(404).send({ message: "Путь не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
