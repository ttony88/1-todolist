import React, {FC} from "react"

type ButtonPropsType = {
    textButton: string
    isDisabled?: boolean
    onClick: () => void
    classes?: string
}

export const Button : FC<ButtonPropsType> = ({textButton, isDisabled, onClick, classes}) => {

    return(
        <button disabled={isDisabled} 
                onClick={onClick}
                className={classes}>
            {textButton}
        </button>
    )
} 