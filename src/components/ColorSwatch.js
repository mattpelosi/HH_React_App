import React from "react";
import "../css/color.swatch.css";

function ColorSwatch(props) {
  const { isSelected, colorData, showLightness } = props;

  return (
    <div
      className={`swatch-container${isSelected ? " selected" : ""}`}
      onClick={() => {
        props.detailView(colorData.hexCode);
      }}
    >
      <div className="color-swatch" style={{ background: colorData.hexCode }} />
      <div className="color-data">
        <p className="color-label">{colorData.hexCode}</p>
        {showLightness && (
          <p className="color-lightness">{colorData.lightness}</p>
        )}
      </div>
    </div>
  );
}

export default ColorSwatch;
