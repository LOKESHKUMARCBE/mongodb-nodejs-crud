const http = require("http");
const fs = require("fs");
const querystring = require("querystring");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {

 await client.connect();
 db = client.db("hrDB");

 console.log("MongoDB Connected");

}

connectDB();

const server = http.createServer(async (req,res)=>{

 if(req.method==="GET" && req.url==="/"){

  fs.readFile("form.html",(err,data)=>{
   res.writeHead(200,{"Content-Type":"text/html"});
   res.write(data);
   res.end();
  });

 }

 // CREATE

 else if(req.method==="POST" && req.url==="/add"){

  let body="";

  req.on("data",(chunk)=>{
   body+=chunk;
  });

  req.on("end",async ()=>{

   const formData=querystring.parse(body);

   const employee={
    name:formData.name,
    department:formData.department,
    designation:formData.designation,
    salary:parseInt(formData.salary)
   };

   await db.collection("employees").insertOne(employee);

   res.writeHead(200);
   res.end("Employee Added");

  });

 }

 // UPDATE

 else if(req.method==="POST" && req.url==="/update"){

  let body="";

  req.on("data",(chunk)=>{
   body+=chunk;
  });

  req.on("end",async ()=>{

   const formData=querystring.parse(body);

   await db.collection("employees").updateOne(
    {name:formData.name},
    {$set:{salary:parseInt(formData.salary)}}
   );

   res.writeHead(200);
   res.end("Employee Updated");

  });

 }

 // DELETE

 else if(req.method==="POST" && req.url==="/delete"){

  let body="";

  req.on("data",(chunk)=>{
   body+=chunk;
  });

  req.on("end",async ()=>{

   const formData=querystring.parse(body);

   await db.collection("employees").deleteOne(
    {name:formData.name}
   );

   res.writeHead(200);
   res.end("Employee Deleted");

  });

 }

 // READ

 else if(req.method==="GET" && req.url==="/view"){

  const employees=await db.collection("employees").find().toArray();

  res.writeHead(200,{"Content-Type":"application/json"});
  res.end(JSON.stringify(employees,null,2));

 }

});

server.listen(3000,()=>{

 console.log("Server running at http://localhost:3000");

});