import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Articles from "./components/articles";
import ArticleDetails from "./components/articleDetails";
import Images from "./components/images";
import Search from "./components/search";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/articles/:id" component={ArticleDetails} />
            <Route path="/articles" component={Articles} />
            <Route path="/images/:id" component={Images} />
            <Route path="/search" component={Search} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Search} />
            <Redirect to="/not-found" />
            
            
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
