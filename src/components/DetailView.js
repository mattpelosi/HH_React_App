import React from "react";
import ColorSwatch from "./ColorSwatch";
import '../css/detail.view.css'

class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.scrollToSelectedItem = this.scrollToSelectedItem.bind(this);
  }

  componentDidMount() {
    this.scrollToSelectedItem();
  }

  componentDidUpdate() {
    this.scrollToSelectedItem();
  }

  scrollToSelectedItem() {
    const el = document.getElementsByClassName("selected");
    el[0].scrollIntoView({ block: "center", behavior: "smooth" });
  }

  render() {
    return (
      <div className="detail-view">
        <div className="detail-focus">
          <div
            className="detail-color"
            style={{ background: this.props.detailColor }}
          />
          <p className="detail-color-label">{this.props.detailColor}</p>
        </div>
        <div className="detail-color-options">
          {this.props.detailList.map((color, index) => (
            <ColorSwatch
              key={index}
              colorData={color}
              showLightness={true}
              detailView={this.props.detailView}
              isSelected={
                color.hexCode === this.props.detailColor ? true : false
              }
            />
          ))}
        </div>
        <button
          className="clear-color-button"
          onClick={this.props.clearDetailView}
        >
          Clear
        </button>
      </div>
    );
  }
}

export default DetailView;
