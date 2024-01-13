import React, {FC} from "react"
import { FilterValuesType } from "./App"

type ButtonPropsType = {
    textButton: string
    onClickHandler: () => void
}

export const Button : FC<ButtonPropsType> = ({textButton, onClickHandler}) => {

    return(
        <button onClick={onClickHandler}>{textButton}</button>
    )
} 