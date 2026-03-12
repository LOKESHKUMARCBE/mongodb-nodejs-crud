// Server Monitoring System using Node.js Timers
console.log("Server monitoring started...");

// setImmediate - runs immediately after current event loop
setImmediate(() => {
    console.log("Immediate task: Loading monitoring modules");
});


// setTimeout - delayed alert
const alertTimer = setTimeout(() => {
    console.log("Warning: Server response slow!");
}, 5000);


// setInterval - periodic health check
let checkCount = 0;

const healthCheck = setInterval(() => {

    checkCount++;

    console.log(`Health Check ${checkCount}: Server running normally`);

    // stop monitoring after 5 checks
    if(checkCount === 5){

        console.log("Stopping monitoring...");

        clearInterval(healthCheck);

        // cancel alert if server stable
        clearTimeout(alertTimer);

        console.log("Monitoring stopped successfully");

    }

}, 2000);