const http = require('http');
const fs = require('fs');
const querystring = require('querystring');


// create server
const server = http.createServer((req,res)=>{

// serve form
if(req.method === "GET"){

    fs.readFile('form.html',(err,data)=>{

        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();

    });

}


// handle form submission
else if(req.method === "POST"){

    let body = "";

    req.on('data',(chunk)=>{
        body += chunk.toString();
    });


    req.on('end',()=>{

        const formData = querystring.parse(body);

        const student = `${formData.name}, ${formData.dept}, ${formData.year}\n`;

        console.log("Student Data:", student);


        // WRITE FILE
        fs.writeFile('students.txt', student, (err)=>{
            if(err) throw err;
            console.log("File created and first record written");
        });


        // APPEND FILE
        fs.appendFile('students.txt', student, (err)=>{
            if(err) throw err;
            console.log("Student record appended");
        });


        // READ FILE
        fs.readFile('students.txt','utf8',(err,data)=>{
            if(err) throw err;
            console.log("File contents:");
            console.log(data);
        });


        // RENAME FILE
        fs.rename('students.txt','students_record.txt',(err)=>{
            if(err) throw err;
            console.log("File renamed");
        });


        // STREAM READ
        const stream = fs.createReadStream('students_record.txt','utf8');

        stream.on('data',(chunk)=>{
            console.log("Stream Data:", chunk);
        });


        // DELETE FILE AFTER 10 seconds
        setTimeout(()=>{

            fs.unlink('students_record.txt',(err)=>{
                if(err) throw err;
                console.log("File deleted after processing");
            });

        },10000);



        res.writeHead(200,{'Content-Type':'text/html'});
        res.end("<h2>Student Registered Successfully</h2>");

    });

}

});

server.listen(3000,()=>{
console.log("Server running at http://localhost:3000");
});