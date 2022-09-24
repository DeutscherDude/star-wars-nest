export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};

export const isNull = (value: unknown): value is null => {
  return value === null;
};

export const isArray = (value: unknown): value is Array<any> => {
  return value === Array;
};
