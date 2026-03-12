const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const EventEmitter = require('events');

class HospitalEmitter extends EventEmitter {}

const hospital = new HospitalEmitter();


// prepend listener
hospital.prependListener('patientCheck', () => {
    console.log("Checking patient data...");
});


// listener 1: log patient
hospital.on('patientCheck', (data) => {
    console.log("Patient:", data.name);
});


// listener 2: calculate risk
hospital.on('patientCheck', (data) => {

    if (data.heart > 120 || data.temp > 39) {
        hospital.emit('emergency', data);
    } else {
        console.log("Patient condition normal");
    }

});


// once listener
hospital.once('emergency', (data) => {
    console.log("FIRST EMERGENCY ALERT");
});


// emergency listener
hospital.on('emergency', (data) => {
    console.log("Doctor Alert for patient:", data.name);
});


// create server
const server = http.createServer((req,res)=>{

    if(req.method === 'GET'){

        fs.readFile('patientForm.html',(err,data)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        });

    }

    else if(req.method === 'POST'){

        let body = "";

        req.on('data',(chunk)=>{
            body += chunk.toString();
        });

        req.on('end',()=>{

            const formData = querystring.parse(body);

            hospital.emit('patientCheck', formData);

            res.writeHead(200,{'Content-Type':'text/html'});
            res.end("<h2>Patient report submitted</h2>");

        });

    }

});


server.listen(3000,()=>{
    console.log("Hospital system running at http://localhost:3000");
});