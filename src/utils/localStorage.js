export const setLocalStorageItem = (key, value) => {
  if (value !== undefined && value !== null) {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }
};

export const getLocalStorageItem = (key) => {
  if (typeof localStorage !== "undefined") {
    const serializedItem = localStorage.getItem(key);
    return serializedItem ? JSON.parse(serializedItem) : null;
  } else {
    return null;
  }
};
