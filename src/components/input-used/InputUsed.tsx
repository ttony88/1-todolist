import React, {ChangeEvent, FC}  from 'react'
import style from './InputUsed.module.css'

type InputUsedProps = {
    value: string
    type: string
    name: string
    onChange: any
}
export const InputUsed:FC<InputUsedProps> = (props) => {

    //const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)

    return(
        <>
            <input value={props.value} 
                   onChange={props.onChange} 
                   type={props.type} 
                   className={style.input}
                   name={props.name}/>
        </>
    )
}