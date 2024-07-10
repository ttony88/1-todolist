import React, {FC}  from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import { InputUsed } from '../../components/input-used/InputUsed'
import { ButtonUsed } from '../../components/button-used/ButtonUsed'

type LoginProps = {
    
}

const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
        rememberMe: false,
    },
    onSubmit: (velues) => {

    }
})
export const Login:FC<LoginProps> = (props) => {

    return(
        <div className={style.login}>
            <h2>
                Registration
            </h2>
            <form onSubmit={formik.handleSubmit}>
                <InputUsed type='email'
                          {...formik.getFieldProps('email')} /> 
                <InputUsed type='password'
                          {...formik.getFieldProps('password')} />
                <InputUsed type='checkbox'
                          {...formik.getFieldProps('rememberMe')} />
                <ButtonUsed textButton='login' type='submit' />
            </form>
        </div>
        
    )
}