
import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import {Link, Route, Switch, useLocation }from "react-router-dom";
import { HomePage} from "./screens/homePage/index";
import { ProductsPage, } from "./screens/productsPage";
import { OrdersPage, } from "./screens/ordersPage";
import { UserPage, } from "./screens/userPage";
import { HomeNavbar } from "./companents/headers/HomeNavbar";
import { OtherNavbar } from "./companents/headers/OtherNavber";

function App() {
  const location = useLocation();
  console.log("location:", location);
  return (  
  <>
    {location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>}
    <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
         <Route path="/">
          <HomePage />
        </Route> 
      </Switch>
   </>

);
}


export default App;




