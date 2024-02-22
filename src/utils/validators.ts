export function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
}


export function createPasswordValidationMessage(list: string[]): string {
    let validationMessage = 'The password should '
    if (list.includes('min')) validationMessage += 'be atleast 8 characters long,'
    if (list.includes('letters')) validationMessage += 'have atleast one letter,'
    if (list.includes('symbols')) validationMessage += 'have atleast one special character,'
    if (list.includes('digits')) validationMessage += 'have atleast one digit.'
    validationMessage = validationMessage.slice(0, validationMessage.length - 1) + '.'
    return validationMessage
}

