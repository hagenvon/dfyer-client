import React from "react";
import './headline.css'

export function SubHeadline(props: {value: string}){
    return <div className={"sub-headline"}>{props.value}</div>
}
