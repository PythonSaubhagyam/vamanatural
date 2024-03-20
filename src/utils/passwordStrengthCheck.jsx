const MIN_PASSWORD_LENGTH = 8;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const DIGIT_REGEX = /\d/;
const SPECIAL_CHAR_REGEX = /[!@#$_.~-]/;

export default function isPasswordStrong(password) {
    const hasUppercase = UPPERCASE_REGEX.test(password);
    const hasLowercase = LOWERCASE_REGEX.test(password);
    const hasDigit = DIGIT_REGEX.test(password);
    const hasSpecialChar = SPECIAL_CHAR_REGEX.test(password);
    const hasMinLength = password?.length >= MIN_PASSWORD_LENGTH;
    
    return (
        hasUppercase &&
        hasLowercase &&
        hasDigit &&
        hasSpecialChar &&
        hasMinLength
    );
}
