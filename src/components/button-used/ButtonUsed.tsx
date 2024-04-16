import { Button } from "@mui/material"
import React, {FC} from "react"

type ButtonUsedPropsType = {
    textButton: string
    isDisabled?: boolean
    onClick: () => void
}

export const ButtonUsed : FC<ButtonUsedPropsType> = ({textButton, isDisabled, onClick}) => {

    return(
        <Button variant="contained" 
                disabled={isDisabled} 
                onClick={onClick}>
            {textButton}
        </Button>
    )
} 