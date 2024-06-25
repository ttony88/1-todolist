import { Button } from "@mui/material"
import React, {FC} from "react"

type ButtonUsedPropsType = {
    textButton: string
    isDisabled?: boolean
    type?: "button" | "submit" | "reset" | undefined
    onClick?: () => void
}

export const ButtonUsed : FC<ButtonUsedPropsType> = ({isDisabled, textButton, onClick, type}) => {

    return(
        <Button variant="contained" 
                disabled={isDisabled}
                type={type ? type=type : 'button'}
                onClick={onClick ? () => onClick() : () => {}}>
            {textButton}
        </Button>
    )
} 