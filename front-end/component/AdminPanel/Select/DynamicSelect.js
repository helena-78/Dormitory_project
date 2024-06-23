import {FormControl, NativeSelect} from "@mui/material";
import * as React from "react";
import styles from './DynamicSelect.css'

export function DynamicSelect(props){
    let optionList = generateOptions(props.options);

return(
    <FormControl fullWidth className="selectBlock">
        <div><b>Виберіть {props.title}:</b></div>
        <div>
            <NativeSelect defaultValue={0}>
                {optionList}
            </NativeSelect>
        </div>
    </FormControl>
);
}

function generateOptions(options){
let optionList = [];

    for (let i = 0; i <options.length ; i++) {
      optionList[i] = <option value={i}>{options[i]}</option>;
    }

    return optionList;
}