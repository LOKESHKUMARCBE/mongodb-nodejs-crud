// Import EventEmitter
const EventEmitter = require('events');

// Create custom class
class StudentSystem extends EventEmitter {}

// Create object
const student = new StudentSystem();

// ==========================
// Register Listeners
// ==========================

// 1. When student registers
student.on('studentRegistered', (name) => {
    console.log(`Student Registered: ${name}`);
});

// 2. Send email confirmation
student.on('studentRegistered', (name) => {
    console.log(`Email sent to ${name}`);
});

// 3. Store data in database
student.on('dataStored', (name) => {
    console.log(`Student data stored for ${name}`);
});

// 4. One-time initialization
student.once('init', () => {
    console.log('System initialized successfully!');
});

// 5. Error handling
student.on('error', (err) => {
    console.error('Error occurred:', err.message);
});

// ==========================
// Emit Events
// ==========================

student.emit('init');

student.emit('studentRegistered', 'Rahul');
student.emit('dataStored', 'Rahul');

// Trigger error event (for demo)
student.emit('error', new Error('Database connection failed'));

// This will NOT run again (once)
student.emit('init');