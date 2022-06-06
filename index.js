const express = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");

const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello i am akash");
});


app.get("/users", (req, res) => {
  fs.readFile("./db.json", { encoded: "utf-8" }, (err, data) => {
    // res.setHeaders("content-type", "application/json");
    res.send(data);
  });
});


app.post("/user/create", (req, res) => {
  console.log(req.body);
  fs.readFile("./db.json", { encoded: "utf-8" }, (err, data) => {
    
    const parsed = JSON.parse(data);
    parsed.users = [...parsed.users, req.body];

  });
});

app.post("/user/login", (req, res) => {

    fs.writeFile(
      "./db.json",
      JSON.stringify(parsed),
      { encoded: "utf-8" },
      () => {
        res.status(201).send(`Login Successful ${uuid()} ${flag}`);
      }
    );
  });
});


app.post("/user/login/:id", (req, res) => {
  let { id } = req.params();
  let flag = false;
  //   console.log(req.body);
  fs.readFile("./db.json", { encoded: "utf-8" }, (err, data) => {
    //preserving old data
    const parsed = JSON.parse(data);

    parsed.users = parsed.users.map((el) =>
      el.id == id ? { ...el, token: "" } : el
    );

    fs.writeFile(
      "./db.json",
      JSON.stringify(parsed),
      { encoded: "utf-8" },
      () => {
        res.send(`user logged out successfully`);
      }
    );
  });
});

app.listen(port, () => {
  console.log(`server is started on port http://localhost:${port}/`);
});