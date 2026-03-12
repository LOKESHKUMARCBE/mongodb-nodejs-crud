const EventEmitter = require('events');

class DeliverySystem extends EventEmitter {}

const delivery = new DeliverySystem();


// order received listener
function orderReceived(orderId, customer) {
    console.log(`Order ${orderId} received from ${customer}`);
}


// kitchen processing
delivery.on('orderPlaced', orderReceived);


// second listener
delivery.on('orderPlaced', (orderId) => {
    console.log(`Preparing food for order ${orderId}`);
});


// async listener
delivery.on('orderPlaced', async (orderId) => {
    setTimeout(() => {
        console.log(`Order ${orderId} ready for delivery`);
    }, 1000);
});


// delivery listener
delivery.on('orderDispatch', (orderId) => {
    console.log(`Order ${orderId} dispatched`);
});


// simulate order
delivery.emit('orderPlaced', 501, "Rahul");


// remove listener
delivery.removeListener('orderPlaced', orderReceived);


// emit again
delivery.emit('orderPlaced', 502, "Anita");


// remove all listeners
delivery.removeAllListeners('orderPlaced');


// this will not trigger listeners
delivery.emit('orderPlaced', 503, "John");