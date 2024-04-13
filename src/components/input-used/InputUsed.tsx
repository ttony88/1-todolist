import React, {ChangeEvent, FC}  from 'react'
import style from './InputUsed.module.css'

type InputUsedProps = {
    value: string
    onChange: (value: string) => void
}
export const InputUsed:FC<InputUsedProps> = (props) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)

    return(
        <>
            <input value={props.value} onChange={onChangeHandler} type='text' className={style.input}/>
        </>
    )
}