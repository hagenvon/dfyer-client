import "./RarityItem.css";
import { IRarityItem } from "../../models/Rarity.models";

export const RarityItem = ({
  previewUrl,
  label,
  chance,
  amount,
    subtext
}: IRarityItem) => {

    const showChance = chance && chance > 0;

    const isZeroChance = chance === 0;

  return (
    <div className="rarity-item-wrapper">
      <img src={previewUrl} alt="" className="img-fluid" />
      <div className={"rarity-item-label"}>{label}</div>
        {amount && <div className={"rarity-item-chance-label"}>{`${amount} Bird${amount > 1 ? 'z': ''}`}</div>}
        {isZeroChance && <div>0.0%</div>}
        {subtext && <div>{subtext}</div>}

      {!isZeroChance && showChance && (
        <div>
          <div className={"rarity-item-chance-label"}>{`${chance}%`}</div>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: chance + "%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
