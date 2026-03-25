import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Container } from "@mui/material";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";
import { ProductsPageState } from "../../../lib/types/screen";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void; // savatga mahsulot qo'shish
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const products = useRouteMatch(); // hozirgi URL yo'lini oladi — masalan: /products

  return (
    <div className={"products-page"}>
      <Switch>

        <Route path={`${products.path}/:productId`}> {/* /products/123 — bitta mahsulot */}
          <ChosenProduct onAdd={onAdd} />
        </Route>

        <Route path={`${products.path}`}> {/* /products — barcha mahsulotlar */}
          <Products onAdd={onAdd} />
        </Route>

      </Switch>
    </div>
  );
}