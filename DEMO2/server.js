const http = require("http");
const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const num1 = Number(urlObj.searchParams.get("num1"));
  const num2 = Number(urlObj.searchParams.get("num2"));
  if (!isNaN(num1) && !isNaN(num2)) {
    const sum = num1 + num2;
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Sum = ${sum}`);
  } else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Use format: http://localhost:3000/?num1=10&num2=20");

  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});