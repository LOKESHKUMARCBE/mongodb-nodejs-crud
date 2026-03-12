const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {

    // Serve HTML form
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    // Handle Form Submission
    else if (req.method === 'POST' && req.url === '/calculate') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();  // Convert buffer to string
        });

        req.on('end', () => {

            const parsedData = querystring.parse(body);

            const empid = parsedData.empid;
            const name = parsedData.name;
            const hours = parseFloat(parsedData.hours);

            const rate = 200;
            let wage;

            if (hours <= 40) {
                wage = hours * rate;
            } else {
                const overtime = hours - 40;
                wage = (40 * rate) + (overtime * rate * 1.5);
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h2>Employee Wage Details</h2>
                <p><strong>Employee ID:</strong> ${empid}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Total Hours:</strong> ${hours}</p>
                <p><strong>Total Wage:</strong> ₹${wage}</p>
                <br>
                <a href="/">Go Back</a>
            `);
        });
    }

    else {
        res.writeHead(404);
        res.end('Page Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});