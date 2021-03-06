const express = require("express");
const nanoid = require("nanoid");

const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post("/user/create", (req, res) => {
  fs.readFile("./db.json", "utf-8", (error, data) => {
    const parsed = JSON.parse(data);
    parsed.users = [...parsed.users, req.body];

    fs.writeFile("./db.json", JSON.stringify(parsed), "utf-8", () => {
      res.status(201).send("user created");
    });
  });
});

//Auth
app.post("/user/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .send(`{ status: "please provide username and password" }`);
  }


  fs.readFile("./db.json", "utf-8", (error, data) => {
    const parsed = JSON.parse(data);
    parsed.users = parsed.users.map((el) =>
      req.body.username == el.username && req.body.password == el.password
        ? { ...el, token: Math.random() }
        : el
    );


    fs.writeFile("./db.json", JSON.stringify(parsed), "utf-8", () => {
      res.status(201).send("login successful");
    });
  });
});


app.post("/user/logout", (req, res) => {
  res.send("user logged out successfully");
});


app.get("/votes/party/:party", (req, res) => {
  const { party } = req.params;
  fs.readFile("./db.json", "utf-8", (error, data) => {
    const parsed = JSON.parse(data);
    parsed.users = parsed.users.filter((el) => el.party === party);
    res.send(JSON.stringify(parsed.users));
  });
});



app.get("/votes/voters", (req, res) => {
  fs.readFile("./db.json", "utf-8", (error, data) => {
    const parsed = JSON.parse(data);
    parsed.users = parsed.users.filter((el) => el.role === "voter");
    res.send(JSON.stringify(parsed.users));
  });
});


app.post("/votes/vote/:user", (req, res) => {
  const { user } = req.params;
  fs.readFile("./db.json", "utf-8", (error, data) => {
    const parsed = JSON.parse(data);
    parsed.users = parsed.users.map((t) =>
      t.name == user ? { ...t, votes: 1 } : t
    );

    
    fs.writeFile("./db.json", JSON.stringify(parsed), "utf-8", () => {
      res.send("user voted");
    });
  });
});


app.get("/db", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        const parsed = JSON.parse(data);
        parsed.users = [...parsed.users, req.body];
    
        fs.writeFile("./db.json", JSON.stringify(parsed), "utf-8", () => {
          res.send("user added");
        });
      });
})


app.post("/db", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data))
})




app.listen(8080);