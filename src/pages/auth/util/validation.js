const lowerCase = new RegExp("^(?=.*[a-z])");
const upperCase = new RegExp("^(?=.*[A-Z])");
const number = new RegExp("^(?=.*[0-9])");
const period = new RegExp("^(?=.*[.])");
const special = new RegExp("^[.]");

export const formRules = (password, passwordConfirm, email) => {
  return {
    "": {
      isNotEmail: () => password !== email && passwordConfirm !== email,
      passwordsMatch: () => password === passwordConfirm,
      passwordLength: () => password.length > 7 && passwordConfirm.length > 7,
      hasLowerCase: () => lowerCase.test(password),
      hasUpperCase: () => upperCase.test(password),
      hasNumber: () => number.test(password)
    }
  };
};

export const emailRules = email => {
  return {
    firstNotSpecial: email => !special.test(email),
    hasPeriod: email => period.test(email),
    isNotEmpty: email => email !== ""
  };
};

export const passwordRules = (password, email) => {
  return {
    isNotEmail: password => password !== email,
    passwordLength: password => password.length > 7,
    hasLowerCase: password => lowerCase.test(password),
    hasUpperCase: password => upperCase.test(password),
    hasNumber: password => number.test(password)
  };
};

export const passwordConfirmRules = (password, passwordConfirm) => {
  return {
    passwordsMatch: passwordConfirm => passwordConfirm === password
  };
};
