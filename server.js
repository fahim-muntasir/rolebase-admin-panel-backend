require("dotenv").config();
const app = require("./app/app");
const http = require("http");
const server = http.createServer(app);

const DBConnect = require("./db/connection");

// database connection and app run
DBConnect(`${process.env.DB_URL}/adminpanel`)
  .then(() => {
    console.log("DB connection successfull.");
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((e) => console.log(e));
