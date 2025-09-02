export const generateVerificationCode = () => {
  const code = Math.floor(10000 + Math.random() * 90000);
  return code;
};
