// server.js

const http = require("http");

const server = http.createServer((req, res) => {

  if (req.method === "POST" && req.url === "/calculate") {

    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {

      const data = JSON.parse(body);

      const num1 = Number(data.num1);
      const num2 = Number(data.num2);

      const sum = num1 + num2;

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result: sum }));

    });

  } else {
    res.writeHead(404);
    res.end("Route Not Found");
  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});