export const isObject = (item: any): boolean =>
  item && typeof item === 'object' && !Array.isArray(item);

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        mergeDeep(target[key], source[key]);

      } else if (Array.isArray(source[key])) {
        Object.assign(target, {
          [key]: target[key]
            ? [...target[key], ...source[key]]
            : source[key]
        });

      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}
