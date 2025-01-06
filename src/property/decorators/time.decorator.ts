export function Time(): MethodDecorator {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    console.log('target: ', target);
    console.log('key: ', key);
    console.log('descriptor: ', descriptor);

    descriptor.value = function (...args: any[]) {
      console.time(key.toString());
      const result = originalMethod.apply(this, args);
      console.timeEnd(key.toString());

      return result;
    };
    return descriptor;
  };
}
