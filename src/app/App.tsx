import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage/index";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./companents/headers/HomeNavbar";
import OtherNavbar from "./companents/headers/OtherNavber";
import HelpPage from "./screens/helpPage";
import Footer from "./companents/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/home.css";
import { CartItem } from "../lib/types/search";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./companents/auth";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [authMember, setAuthMember] = useState<any>(null); // can use Member type if imported

  /** HANDLERS **/

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <>
      {location.pathname === "/" ? (
      <HomeNavbar 
       cartItems={cartItems}
       onAdd={onAdd}
       onRemove={onRemove}
       onDelete={onDelete}
       onDeleteAll={onDeleteAll}
       setSignupOpen={setSignupOpen}
       setLoginOpen={setLoginOpen}
       authMember={authMember}
       />
      ) : (
         <OtherNavbar 
      cartItems={cartItems}
       onAdd={onAdd}
       onRemove={onRemove}
       onDelete={onDelete}
       onDeleteAll={onDeleteAll}
       setSignupOpen={setSignupOpen}
       setLoginOpen={setLoginOpen}
       authMember={authMember}
      /> 
       )}

      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
  

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
        setAuthMember={setAuthMember}
       />
    </>
  );
}

export default App;