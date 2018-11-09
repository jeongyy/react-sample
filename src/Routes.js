import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewProduct from "./containers/NewProduct";
import Product from "./containers/Product";
import Category from "./containers/categoryFirst";
import CategorySecond from "./containers/categorySecond";
import CategoryThird from "./containers/categoryThird";
import RegProduct from "./containers/RegProduct";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AppliedRoute from "./components/AppliedRoute";
import NotFound from "./containers/NotFound";

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps}/>
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps}/>
        <AuthenticatedRoute path="/products/new" exact component={NewProduct} props={childProps}/>
        <AuthenticatedRoute path="/products/reg" exact component={RegProduct} props={childProps}/>
        <AuthenticatedRoute path="/products/:id" exact component={Product} props={childProps}/>
        <AuthenticatedRoute path="/category/list" exact component={Category} props={childProps}/>
        <AuthenticatedRoute path="/category/list/:code" exact component={CategorySecond} props={childProps}/>
        <AuthenticatedRoute path="/category/list/:code1/:code2" exact component={CategoryThird} props={childProps}/>
        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound}/>
    </Switch>;
