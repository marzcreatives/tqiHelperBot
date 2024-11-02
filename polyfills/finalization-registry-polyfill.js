if (typeof FinalizationRegistry === 'undefined') {
    globalThis.FinalizationRegistry = class {
        constructor() {}
        register() {}
        unregister() {}
    };
}
