import React from "react";
import './headline.css'

export function Headline(props: {headline: string}){
    return <div className={"headline"}>{props.headline}</div>
}
