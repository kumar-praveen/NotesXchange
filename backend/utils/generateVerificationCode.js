export const generateVerificationCode = () => {
  const code = Math.floor(Math.random() * 99999) + 1;
  return code;
};
