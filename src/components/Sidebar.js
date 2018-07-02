import React from "react";
import { connect } from "react-redux";
import { selectRandomColor } from "../store/color.actions";
import "../css/sidebar.css";

class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    this.selectRandomColor = this.selectRandomColor.bind(this);
    this.setColorGroupNames = this.setColorGroupNames.bind(this);
    this.selectColorGroup = this.selectColorGroup.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.colorGroups !== prevProps.colorGroups) {
      this.setColorGroupNames(this.props.colorGroups);
    }
  }

  selectRandomColor() {
    const colorArr = this.props.colorIndex;
    const randomColor = colorArr[Math.floor(Math.random() * colorArr.length)];
    this.props.selectRandomColor(randomColor);
  }

  selectColorGroup(color) {
    const groupArr = this.props.colorGroups[color];
    this.props.selectRandomColor(groupArr[10]);
  }

  setColorGroupNames(colorGroups) {
    const colorNamesArr = [];
    for (let color in colorGroups) {
      colorNamesArr.push(color);
    }
    this.setState(prevState => {
      return { ...prevState, colorNames: colorNamesArr };
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <button
            className="random-color-button"
            onClick={this.selectRandomColor}
            disabled={!this.props.colorIndex}
          >
            Random Color
          </button>
          {this.state.colorNames &&
            this.state.colorNames.map((color, index) => (
              <button
                key={index}
                className="group-color-button"
                onClick={() => {
                  this.selectColorGroup(color);
                }}
              >
                {color}
              </button>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  colorIndex: state.colorIndex,
  colorGroups: state.colorGroups
});

const mapDispatchToProps = dispatch => ({
  selectRandomColor: color => {
    dispatch(selectRandomColor(color));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
