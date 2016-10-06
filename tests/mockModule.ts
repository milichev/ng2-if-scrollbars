export interface MockModule {
    [key: string]: any;
}

export default function mockModule(module: MockModule,
                                   mockModule: MockModule): Function {
    let keys = Object.keys(mockModule);
    keys.forEach(key => {
        Object.defineProperty(module, key, {
            writable: true,
            value: mockModule[key]
        });
    });
    return function revert() {
        keys.forEach(key => {
            Object.defineProperty(module, key, {
                writable: false,
                value: module[key]
            });
        });
    };
}
