import React from "react";
import * as colorService from "../services/color.service.js";
import ColorSwatch from "./ColorSwatch";
import Paginator from "./Paginator";
import DetailView from "./DetailView";
import { connect } from "react-redux";
import { addColorIndex, addColorGroupsObj } from "../store/color.actions";
import "../css/content.wrapper.css";
import Spinner from "react-spinkit";

class ContentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allColorsArr: [],
      allColorsObj: {},
      currentColors: [],
      currentPage: null,
      totalPages: null,
      detailView: false,
      detailColor: "",
      detailList: [],
      loading: true
    };
  }

  async componentDidMount() {
    const colors = await colorService.read();
    delete colors._id;
    await this.setState(
      {
        allColorsObj: colors,
        loading: false
      },
      () => this.generateRandomColors()
    );
    this.props.addColorGroups(colors);
  }

  componentDidUpdate(prevState) {
    if (this.props.randomColor !== prevState.randomColor) {
      this.selectDetailView(this.props.randomColor.hexCode);
    }
  }

  generateRandomColors = () => {
    const colors = JSON.parse(JSON.stringify(this.state.allColorsObj));
    let hexCodeArr = this.ArrayFromObj(colors);
    hexCodeArr = this.shuffleColorsArray(hexCodeArr);
    this.setState({ allColorsArr: hexCodeArr });
    this.props.addColorIndex(hexCodeArr);
  };

  ArrayFromObj = obj => {
    let arr = [];
    for (let color in obj) {
      for (let i = 0; i < obj[color].length; i++) {
        arr.push(obj[color][i]);
      }
    }
    return arr;
  };

  shuffleColorsArray = arr => {
    //Fisher-Yates shuffle
    let m = arr.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }

    return arr;
  };

  onPageChange = data => {
    const offset = (data.currentPage - 1) * data.pageLimit;
    const currentColors = this.state.allColorsArr.slice(
      offset,
      offset + data.pageLimit
    );

    this.setState({
      currentPage: data.currentPage,
      currentColors: currentColors,
      totalPages: data.totalPages
    });
  };

  returnColorGroup = color => {
    const obj = this.state.allColorsObj;
    let group = {};
    for (let prop in obj) {
      for (let i = 0; i < obj[prop].length; i++) {
        if (obj[prop][i].hexCode === color) {
          group = obj[prop];
          break;
        }
      }
    }
    return group;
  };

  selectDetailView = color => {
    const detailList = this.returnColorGroup(color);

    this.setState({
      detailView: true,
      detailColor: color,
      detailList: detailList
    });
  };

  clearDetailView = () => {
    this.setState({
      detailView: false,
      detailColor: ""
    });
  };

  render() {
    const {
      loading,
      allColorsArr,
      detailView,
      currentColors,
      detailColor,
      detailList
    } = this.state;

    return (
      <React.Fragment>
        {loading || allColorsArr.length === 0 ? (
          <React.Fragment>
            <div className="loading">
              <h3>Loading</h3>
              <Spinner name="three-bounce" color="black" />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="content-wrapper">
              {!detailView ? (
                <React.Fragment>
                  <div className="color-list">
                    {currentColors.map((color, index) => (
                      <ColorSwatch
                        key={index}
                        colorData={color}
                        detailView={this.selectDetailView}
                      />
                    ))}
                  </div>
                  <Paginator
                    totalColors={allColorsArr.length}
                    pageLimit={12}
                    pageNeighbors={1}
                    onPageChange={this.onPageChange}
                  />
                </React.Fragment>
              ) : (
                <DetailView
                  detailColor={detailColor}
                  clearDetailView={this.clearDetailView}
                  detailList={detailList}
                  detailView={this.selectDetailView}
                />
              )}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  randomColor: state.randomColor
});

const mapDispatchToProps = dispatch => ({
  addColorIndex: colorIndex => {
    dispatch(addColorIndex(colorIndex));
  },
  addColorGroups: colorGroups => {
    dispatch(addColorGroupsObj(colorGroups));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWrapper);
