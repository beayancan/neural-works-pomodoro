export const validateNumber = (value: string) => {
  const regex = /^[0-9\b]+$/;
  if (value === "" || regex.test(value)) {
    return value;
  }
  return null;
};
