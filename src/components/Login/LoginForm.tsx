import React, { useContext, useState } from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import InputField from '../shared/InputField/InputField'
import KeyIcon from '@mui/icons-material/Key'
import './loginForm.scss'
import CustomButton from '../shared/Button/CustomButton'
import { IUser } from '../../common/interfaces/User'
import useLoginSignupValidation from '../../hooks/useLoginSignupValidation'
import { View } from '../../common/enums/View'
import useFetch from '../../hooks/useFetch'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { IUserContext } from '../../common/interfaces/UserContext'

function LoginForm() {
    const [user, setUser] = useState<IUser>({} as IUser)
    const loginSignUpValidation = useLoginSignupValidation(user)

    const usersApi = useFetch("users")
    let navigate = useNavigate()
    const { login } = useContext<IUserContext>(UserContext)


    const handleLogin = async () => {
        if (loginSignUpValidation.validateInputs(View.LOGIN)) {
            console.log('validated')
            try {
                const res: IUser = await usersApi.post('/authenticate', user)
                if (res.accessToken) {
                    toast.success('Logged In')
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
        <div className="login-form-container">
            <h1>Log In</h1>
            <div className="login-form">
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
                    <CustomButton
                        text={'Login'}
                        onClick={handleLogin}
                    />
                </div>

            </div>
        </div>
    )
}

export default LoginForm