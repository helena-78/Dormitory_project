'use client'

import {FormControl, NativeSelect} from "@mui/material";
import * as React from "react";
import styles from './DynamicSelect.css'

export function DynamicSelect(props) {
    let optionList = generateOptions(props.options);

    return (
        <FormControl fullWidth className="selectBlock">
            <div><b>Виберіть {props.title}:</b></div>
            <div>
                <NativeSelect onChange={handleSelect} defaultValue={-1}>
                    <option value="-1" disabled selected>...</option>
                    {optionList}
                </NativeSelect>
            </div>
        </FormControl>
    );

    function handleSelect(selectedItem){
       props.handleSelectChange(selectedItem.target.value);
    }
}

function generateOptions(options) {
    let optionList = [];

    for (let i = 0; i < options.length; i++) {
        optionList[i] = <option key={i} value={i}>{options[i]}</option>;
    }

    return optionList;
}

