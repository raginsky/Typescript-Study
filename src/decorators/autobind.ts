/** Autobind Decorator */
export function binding(_: any, _2: any, descriptor: PropertyDescriptor) {
    const initMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return initMethod.bind(this);
        }
    }
    return adjDescriptor;
}
