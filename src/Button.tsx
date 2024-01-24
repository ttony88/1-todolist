import React, {FC} from "react"

type ButtonPropsType = {
    textButton: string
    isDisabled?: boolean
    onClickHandler: () => void
    classes?: string
}

export const Button : FC<ButtonPropsType> = ({textButton, isDisabled, onClickHandler, classes}) => {

    return(
        <button disabled={isDisabled} 
                onClick={onClickHandler}
                className={classes}>
            {textButton}
        </button>
    )
} 