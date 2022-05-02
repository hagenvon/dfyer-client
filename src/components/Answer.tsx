import React from "react";
import './question.css'

export function Answer(props: {value: string}){
    return <div className={"answer"}>{props.value}</div>
}
