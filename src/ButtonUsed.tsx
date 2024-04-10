import React, {FC} from "react"

type ButtonUsedPropsType = {
    textButton: string
    isDisabled?: boolean
    onClick: () => void
    classes?: string
}

export const ButtonUsed : FC<ButtonUsedPropsType> = ({textButton, isDisabled, onClick, classes}) => {

    return(
        <button disabled={isDisabled} 
                onClick={onClick}
                className={classes}>
            {textButton}
        </button>
    )
} 