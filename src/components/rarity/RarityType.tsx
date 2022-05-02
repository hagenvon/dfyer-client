import "./RarityType.css";
import React from "react";
import { RarityItem } from "./RarityItem";
import { IRarityType } from "../../models/Rarity.models";
import { Headline } from "../Headline";
import {SubHeadline} from "../SubHeadline";

export const RarityType = (props: IRarityType) => {
  const { headline, items, subline } = props;
  return (
    <div className="rarity-type-wrapper row">
      <div className="col-12">
        <Headline headline={headline} />
          {subline && <SubHeadline value={subline}/>}
      </div>
      {items.map((item, index) => {
        return (
          <div className={" col-md-3 col-6"} key={index}>
            <RarityItem
              previewUrl={item.previewUrl}
              label={item.label}
              chance={item.chance}
              amount={item.amount}
              subtext={item.subtext}
            />
          </div>
        );
      })}
    </div>
  );
};
