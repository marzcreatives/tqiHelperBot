// polyfills/node-polyfills.js

// Polyfill `global` if it doesn't exist
if (typeof global === 'undefined') {
    global = globalThis;
}

// Polyfill `process` if it doesn't exist
if (typeof process === 'undefined') {
    global.process = {
        env: {},
        nextTick: (cb) => setTimeout(cb, 0),
    };
}

// Polyfill `Buffer` if it doesn't exist
if (typeof Buffer === 'undefined') {
    global.Buffer = {
        from: (str, encoding) => new TextEncoder().encode(str),
    };
}
