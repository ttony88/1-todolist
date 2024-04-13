import { Button } from "@mui/material"
import React, {FC} from "react"

type ButtonUsedPropsType = {
    textButton: string
    isDisabled?: boolean
    onClick: () => void
    classes?: string
}

export const ButtonUsed : FC<ButtonUsedPropsType> = ({textButton, isDisabled, onClick, classes}) => {

    return(
        <Button variant="contained" disabled={isDisabled} 
                onClick={onClick}
                className={classes}>
            {textButton}
        </Button>
    )
} 