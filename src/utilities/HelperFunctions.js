export const setDataToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const validateEmail = (email) => {
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return regex.test(email);
};

export const validatePassword = (password) => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
};
