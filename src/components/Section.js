import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Products from "./pages/Products.js";
import Contacts from "./pages/Contacts.js";
import ContactsView from "./admin/ContactsView.js";
import Login from "./admin/Login";
import HomeAdm from "./admin/Home";
import ContactsResponse from "./admin/ContactsResponse";
import ClientsView from "./admin/clients/ClientsView.js";
import ClientDetails from "./admin/clients/ClientDetails.js";
import ClientCreate from "./admin/clients/ClientCreate.js";
import PrivateRoute from "../services/common/PrivateRoute"

function Section() {
  return (
    <section id="section" className="container">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route exact path="/users/login">
          <Login />
        </Route>

        <PrivateRoute exact path="/admin/home" component={HomeAdm} />
        <PrivateRoute
          exact
          path="/admin/contacts/view"
          component={ContactsView}
        />
        <PrivateRoute
          path="/admin/contacts/response/:id"
          component={ContactsResponse}
        />
        <PrivateRoute
          exact
          path="/admin/clients/create"
          component={ClientCreate}
        />
        <PrivateRoute
          exact
          path="/admin/clients/view"
          component={ClientsView}
        />
        <PrivateRoute
          exact
          path="/admin/clients/details/:id"
          component={ClientDetails}
        />
      </Switch>
    </section>
  );
}

export default Section;
