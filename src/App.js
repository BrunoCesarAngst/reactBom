import React from "react";

import Header from "./components/Header.js";
import Nav from "./components/Nav.js";
import Section from "./components/Section.js";
import Footer from "./components/Footer.js";
import {
  BrowserRouter as Router
} from "react-router-dom";

function App() {
  return ( <
    div >
    <
    Router >
    <
    Header / >
    <
    Nav / >
    <
    Section / >
    <
    Footer / >
    <
    /Router> < /
    div >
  );
}

export default App;
