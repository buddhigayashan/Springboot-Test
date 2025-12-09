export const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

export const validateRequired = (value) => Boolean(value && value.toString().trim().length > 0);

export const validatePositiveNumber = (value) => !Number.isNaN(Number(value)) && Number(value) >= 0;
