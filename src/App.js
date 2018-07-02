import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Sidebar from "./components/Sidebar.js";
import ContentWrapper from "./components/ContentWrapper.js";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducedStore from "./store/color.reducer";

const store = createStore(
  reducedStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Sidebar />
          <ContentWrapper />
        </div>
      </Provider>
    );
  }
}

export default App;
