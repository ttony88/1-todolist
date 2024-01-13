import React, {FC} from "react"
import { FilterValuesType } from "./App"

type ButtonPropsType = {
    textButton: string
    filterValue: FilterValuesType
    filterTasks: (filter:FilterValuesType) => void
}

export const Button : FC<ButtonPropsType> = ({textButton, filterValue, filterTasks}) => {

    const onClickHandler = () => {
        filterTasks(filterValue)
    }

    return(
        <button onClick={() => onClickHandler()}>{textButton}</button>
    )
} 