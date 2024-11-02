if (typeof WeakRef === 'undefined') {
    globalThis.WeakRef = class {
        constructor(target) {
            this.target = target;
        }
        deref() {
            return this.target;
        }
    };
}
