export const removeUndefinedAndEmpty = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        if (isObject(value)) {
          const cleanedValue = removeUndefinedAndEmpty(value);
          if (!isEmptyObject(cleanedValue)) {
            acc[key] = cleanedValue;
          }
        } else {
          acc[key] = value;
        }
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};

const isObject = (value: any): boolean =>
  value && typeof value === "object" && !Array.isArray(value);
const isEmptyObject = (value: any): boolean =>
  isObject(value) && Object.keys(value).length === 0;
