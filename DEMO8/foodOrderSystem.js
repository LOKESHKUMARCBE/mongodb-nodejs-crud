// Food Order Processing System

console.log("Food Delivery System Started");


// callback function
function orderCompleted(orderId) {
    console.log(`Order ${orderId} completed and delivered`);
}


// function using callback
function processOrder(orderId, callback) {

    console.log(`Order ${orderId} received`);

    // cooking delay using setTimeout
    setTimeout(() => {

        console.log(`Cooking completed for order ${orderId}`);

        callback(orderId);

    }, 3000);

}


// periodic system check using setInterval
const systemMonitor = setInterval(() => {

    console.log("System Monitor: All services running");

}, 2000);


// simulate customer order
processOrder(101, orderCompleted);


// stop monitoring after 8 seconds
setTimeout(() => {

    clearInterval(systemMonitor);

    console.log("System monitoring stopped");

}, 8000);


// immediate startup task
setImmediate(() => {

    console.log("Immediate Task: Loading restaurant services");

});