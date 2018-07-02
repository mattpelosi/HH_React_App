import React from "react";
import "../css/color.swatch.css"

class ColorSwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={`swatch-container${
          this.props.isSelected ? " selected" : ""
        }`}
        onClick={() => {
          this.props.detailView(this.props.colorData.hexCode);
        }}
      >
        <div
          className="color-swatch"
          style={{ background: this.props.colorData.hexCode }}
        />
        <div className="color-data">
          <p className="color-label">{this.props.colorData.hexCode}</p>
          {this.props.showLightness && (
            <p className="color-lightness">{this.props.colorData.lightness}</p>
          )}
        </div>
      </div>
    );
  }
}

export default ColorSwatch;
