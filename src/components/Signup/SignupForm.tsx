import React, { useContext, useState } from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import InputField from '../shared/InputField/InputField'
import KeyIcon from '@mui/icons-material/Key'
import FaceIcon from '@mui/icons-material/Face'
import GroupIcon from '@mui/icons-material/Group'
import './signupForm.scss'
import CustomButton from '../shared/Button/CustomButton'
import { IUser } from '../../common/interfaces/User'
import useLoginSignupValidation from '../../hooks/useLoginSignupValidation'
import { View } from '../../common/enums/View'
import useFetch from '../../hooks/useFetch'
import { toast } from 'react-toastify'
import { IUserContext } from '../../common/interfaces/UserContext'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function SignupForm() {
    const [user, setUser] = useState<IUser>({} as IUser)
    const [secondPassword, setSecondPassword] = useState<string>('')
    const loginSignUpValidation = useLoginSignupValidation(user)
    const usersApi = useFetch("users")
    const { login } = useContext<IUserContext>(UserContext)
    let navigate = useNavigate()

    const signUp = async () => {
        if (loginSignUpValidation.validateInputs(View.SIGNUP) && user.password === secondPassword) {
            try {
                const res: IUser = await usersApi.post('', user)
                if (res.accessToken) {
                    toast.success('User signed up successfully!')
                    login(res)
                    navigate('home')
                }
            }
            catch (err: any) {
                toast.error(err.message)
            }
        }
        else {
            console.log('not validated')
        }
    }

    return (
        <div className="signup-form-container">
            <h1>Sign up</h1>
            <div className="signup-form">
                <div className="field-wrapper">
                    <InputField
                        label={'First Name'}
                        icon={<FaceIcon />}
                        type="text"
                        value={user.firstName}
                        onChange={(newValue) => setUser({ ...user, firstName: newValue })}
                        helperText={
                            loginSignUpValidation.getValidation("firstName").isValid
                                ? ""
                                : loginSignUpValidation.getValidation("firstName").validationMessage
                        }
                        error={!loginSignUpValidation.getValidation("firstName").isValid}
                    />
                </div>
                <div className="field-wrapper">
                    <InputField
                        label={'Surname'}
                        icon={<GroupIcon />}
                        type="text"
                        value={user.surname}
                        onChange={(newValue) => setUser({ ...user, surname: newValue })}
                        helperText={
                            loginSignUpValidation.getValidation("surname").isValid
                                ? ""
                                : loginSignUpValidation.getValidation("surname").validationMessage
                        }
                        error={!loginSignUpValidation.getValidation("surname").isValid}
                    />
                </div>
                <div className="field-wrapper">
                    <InputField
                        label={'Email'}
                        icon={<AccountCircle />}
                        type="email"
                        value={user.email}
                        onChange={(newValue) => setUser({ ...user, email: newValue })}
                        helperText={
                            loginSignUpValidation.getValidation("email").isValid
                                ? ""
                                : loginSignUpValidation.getValidation("email").validationMessage
                        }
                        error={!loginSignUpValidation.getValidation("email").isValid}
                    />
                </div>
                <div className="field-wrapper">
                    <InputField
                        label={'Password'}
                        icon={<KeyIcon />}
                        type="password"
                        value={user.password}
                        onChange={(newValue) => setUser({ ...user, password: newValue })}
                        helperText={
                            loginSignUpValidation.getValidation("password").isValid
                                ? ""
                                : loginSignUpValidation.getValidation("password").validationMessage
                        }
                        error={!loginSignUpValidation.getValidation("password").isValid}
                    />
                </div>
                <div className="field-wrapper">
                    <InputField
                        label={'Re-enter Password'}
                        icon={<KeyIcon />}
                        type="password"
                        value={secondPassword}
                        onChange={(newValue) => setSecondPassword(newValue)}
                        helperText={!secondPassword.length || user.password === secondPassword ? "" : "Passwords should match"}
                        error={secondPassword.length > 0 && !(user.password === secondPassword)}
                    />
                </div>
                <div className="field-wrapper">
                    <CustomButton
                        text={'Sign up'}
                        onClick={signUp}
                    />
                </div>

            </div>
        </div>
    )
}

export default SignupForm