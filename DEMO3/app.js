// app.js

const http = require("http");
const data = JSON.stringify({
  num1: 150,
  num2: 15
});

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/calculate",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
};

const req = http.request(options, res => {

  let body = "";

  res.on("data", chunk => {
    body += chunk;
  });

  res.on("end", () => {
    const result = JSON.parse(body);
    console.log("Result from server:", result.result);
  });

});

req.write(data);
req.end();