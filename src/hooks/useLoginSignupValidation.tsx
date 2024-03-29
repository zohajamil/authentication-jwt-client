import { useState } from "react";
import { IUser } from "../common/interfaces/User";
import { createPasswordValidationMessage, isValidEmail } from "../utils/validators";
import IValidationObject from "../common/interfaces/ValidationObject";
import { View } from "../common/enums/View";

const useLoginSignupValidation = (user: IUser) => {

    const [isValidationPassed, setIsValidationPassed] = useState<boolean>(true)
    const [validationObject, setValidationObject] = useState<IValidationObject[]>([
        { name: "firstName", isValid: true, validationMessage: "" },
        { name: "surname", isValid: true, validationMessage: "" },
        { name: "email", isValid: true, validationMessage: "" },
        { name: "password", isValid: true, validationMessage: "" },
    ])

    const generateInitialValidationObject = (): void => {
        let tempValidationObject: IValidationObject[] = [
            { name: "firstName", isValid: true, validationMessage: "" },
            { name: "surname", isValid: true, validationMessage: "" },
            { name: "email", isValid: true, validationMessage: "" },
            { name: "password", isValid: true, validationMessage: "" },
        ]
        setValidationObject(tempValidationObject)
        setIsValidationPassed(true)
    }

    const validateInputs = (view: View): boolean => {

        let tempValidationObject: IValidationObject[] = [
            { name: "firstName", isValid: true, validationMessage: "" },
            { name: "surname", isValid: true, validationMessage: "" },
            { name: "email", isValid: true, validationMessage: "" },
            { name: "password", isValid: true, validationMessage: "" },
        ]

        let tempIsValidationPassed = true

        const setFailedValidation = (name: string, message: string) => {
            tempIsValidationPassed = false
            const index = tempValidationObject.findIndex(x => x.name === name)
            tempValidationObject[index] = { ...tempValidationObject[index], isValid: false, validationMessage: message }
        }

        if (!user.email || (user.email.trim() === "" || typeof (user.email) === "undefined" || !isValidEmail(user.email))) {
            setFailedValidation("email", "Please enter a valid email.")
        }
        if (user.password === "" || typeof (user.password) === "undefined") {
            setFailedValidation("password", "Please enter your password.")
        }
        if (view === View.SIGNUP) {
            if (!user.firstName || (user.firstName.trim() === "" || typeof (user.firstName) === "undefined")) {
                setFailedValidation("firstName", "Please enter your firstName.")
            }
            if (!user.surname || (user.surname.trim() === "" || typeof (user.surname) === "undefined")) {
                setFailedValidation("surname", "Please enter your surname.")
            }

            var passwordValidator = require('password-validator');
            var schema = new passwordValidator();
            schema
                .is().min(8)
                .has().letters()
                .has().digits()
                .has().symbols()

            var passwordData = schema.validate(user.password, { list: true })
            if (passwordData.length) {
                setFailedValidation("password", createPasswordValidationMessage(passwordData))
            }
        }
        setValidationObject(tempValidationObject)
        setIsValidationPassed(tempIsValidationPassed)
        return tempIsValidationPassed
    }

    const getValidation = (name: string): IValidationObject => {
        let returnValue: IValidationObject = {} as IValidationObject
        const object = validationObject.find(x => x.name === name)
        return object ?? returnValue
    }


    return {
        validationObject,
        setValidationObject,
        isValidationPassed,
        setIsValidationPassed,
        validateInputs,
        getValidation,
        generateInitialValidationObject
    }

}

export default useLoginSignupValidation