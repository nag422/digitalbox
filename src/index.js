import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from "layouts/Admin.js";
import AdminLayoutdash from "layouts/Admindash.js";
import AuthLayout from "layouts/Auth.js";
import UsersProvider from "./views/examples/contexts/UserContext"
import CategoryProvider from "./views/examples/contexts/CategoryContext"
import TopicsProvider from "./views/examples/contexts/TopicsContext"

ReactDOM.render(
  <UsersProvider>
  <CategoryProvider>
    <TopicsProvider>
  <BrowserRouter>
    <Switch>
    <Route exact path="/admin/categories/:token" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/manage/:token" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/users" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/tags" render={props => <AdminLayout {...props} />} />
    <Route exact path="/admin/index" render={props => <AdminLayoutdash {...props} />} />
      
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      
      <Redirect from="/" to="/admin/users" />
    </Switch>
  </BrowserRouter>
  </TopicsProvider>
  </CategoryProvider>
  </UsersProvider>,
  document.getElementById("root")
);
