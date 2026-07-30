// PASSWORD VERIFICATION LOGIC

const equalPasswords = (pass1: string, pass2: string) => {
  console.log(pass1, pass2);
  if (pass1 === pass2) {
    console.log("equal");
  }
  return pass1 === pass2;
};

const matchingLengths = (pass1: string, pass2: string) => {
  return pass1.length === pass2.length;
};

export const matchingPasswords = (pass1: string, pass2: string) => {
  return !(
    equalPasswords(pass1, pass2) &&
    matchingLengths(pass1, pass2) &&
    hasUppercase(pass1) &&
    passwordLength(pass1) &&
    hasDigit(pass1) &&
    hasSpecialCharacter(pass1)
  );
};

export const passwordLength = (pass1: string) => {
  return pass1.length >= 8;
};

export const hasUppercase = (pass1: string) => /[A-Z]/.test(pass1);
export const hasDigit = (pass1: string) => /[0-9]/.test(pass1);
export const hasSpecialCharacter = (pass1: string) =>
  /[^a-zA-Z0-9]/.test(pass1);
