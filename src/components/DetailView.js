import React from "react";
import ColorSwatch from "./ColorSwatch";
import "../css/detail.view.css";

class DetailView extends React.Component {

  componentDidMount() {
    this.scrollToSelectedItem();
  }

  componentDidUpdate() {
    this.scrollToSelectedItem();
  }

  scrollToSelectedItem = () => {
    const el = document.getElementsByClassName("selected");
    el[0].scrollIntoView({ block: "center", behavior: "smooth" });
  };

  render() {
    const { detailColor, detailList, detailView, clearDetailView } = this.props;
    const colorGroupList = detailList.map((color, index) => (
      <ColorSwatch
        key={index}
        colorData={color}
        showLightness={true}
        detailView={detailView}
        isSelected={color.hexCode === detailColor ? true : false}
      />
    ));
    return (
      <div className="detail-view">
        <div className="detail-focus">
          <div className="detail-color" style={{ background: detailColor }} />
          <p className="detail-color-label">{detailColor}</p>
        </div>
        <div className="detail-color-options">{colorGroupList}</div>
        <button className="clear-color-button" onClick={clearDetailView}>
          Clear
        </button>
      </div>
    );
  }
}

export default DetailView;
