const EventEmitter = require('events');

// ========================================
// Custom Event System
// ========================================

class OrderSystem extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(20); // Increase listener limit
    }

    placeOrder(orderId, customer) {
        console.log(`\nOrder Placed: ${orderId} by ${customer}`);
        this.emit('orderPlaced', orderId, customer);
    }
}

const orderSystem = new OrderSystem();

// ========================================
// LISTENER 1 – Logging
// ========================================
orderSystem.on('orderPlaced', (orderId, customer) => {
    console.log(`Log: Order ${orderId} received from ${customer}`);
});

// ========================================
// LISTENER 2 – Payment Processing (Async)
// ========================================
orderSystem.on('orderPlaced', (orderId) => {
    setTimeout(() => {
        console.log(`Payment processed for Order ${orderId}`);
        orderSystem.emit('paymentCompleted', orderId);
    }, 1000);
});

// ========================================
// LISTENER 3 – Inventory Update
// ========================================
orderSystem.on('paymentCompleted', (orderId) => {
    console.log(`Inventory updated for Order ${orderId}`);
});

// ========================================
// LISTENER 4 – Shipping
// ========================================
orderSystem.on('paymentCompleted', (orderId) => {
    console.log(`Shipping initiated for Order ${orderId}`);
});

// ========================================
// ONCE LISTENER – System Initialization
// ========================================
orderSystem.once('init', () => {
    console.log('Order System Initialized');
});

// ========================================
// ERROR HANDLING
// ========================================
orderSystem.on('error', (err) => {
    console.error('System Error:', err.message);
});

// ========================================
// REMOVING A LISTENER DEMO
// ========================================

function tempListener(orderId) {
    console.log(`Temporary listener for Order ${orderId}`);
}

orderSystem.on('orderPlaced', tempListener);

// Remove it after first execution
orderSystem.once('orderPlaced', () => {
    orderSystem.removeListener('orderPlaced', tempListener);
    console.log('Temporary listener removed');
});

// ========================================
// MEMORY LEAK WARNING DEMO
// ========================================
for (let i = 0; i < 5; i++) {
    orderSystem.on('bulkEvent', () => {
        console.log('Bulk event triggered');
    });
}

// ========================================
// EXECUTION FLOW
// ========================================

orderSystem.emit('init');

orderSystem.placeOrder('ORD101', 'Rahul');

setTimeout(() => {
    orderSystem.placeOrder('ORD102', 'Anita');
}, 2000);

// Trigger custom error after delay
setTimeout(() => {
    orderSystem.emit('error', new Error('Database connection failed'));
}, 4000);