import React from "react";
import './question.css'

export function Question(props: {value: string}){
    return <div className={"question"}>{props.value}</div>
}
