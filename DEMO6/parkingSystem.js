const EventEmitter = require('events');

class ParkingSystem extends EventEmitter {}

const parking = new ParkingSystem();

let totalSlots = 2;
let occupied = 0;


// listener 1
parking.on('carEntry', (car) => {
    occupied++;
    console.log(`Car ${car} entered parking`);
});


// listener 2
parking.on('carEntry', () => {
    console.log(`Occupied Slots: ${occupied}/${totalSlots}`);
});


// prepend listener (runs first)
parking.prependListener('carEntry', () => {
    console.log("Checking parking availability...");
});


// once listener
parking.once('parkingFull', () => {
    console.log("Parking is FULL. Redirect vehicles.");
});


// exit listener
parking.on('carExit', (car) => {
    occupied--;
    console.log(`Car ${car} exited`);
});


// error listener
parking.on('error', (err) => {
    console.log("System Error:", err.message);
});


// simulate events
parking.emit('carEntry', "TN01AA1010");
parking.emit('carEntry', "TN01AA2020");
parking.emit('carEntry', "TN01AA2121");

if (occupied >= totalSlots) {
    parking.emit('parkingFull');
}

parking.emit('carExit', "TN01AA1010");


// listener count
console.log("Car Entry Listeners:", parking.listenerCount('carEntry'));