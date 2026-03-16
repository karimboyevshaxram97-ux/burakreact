import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Collections, MonetizationOn, Search } from "@mui/icons-material";


import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
   const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

const [searchText, setSearchText] = useState<string>("");
const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);


  useEffect(() => {
  if (searchText === "") {
    productSearch.search = "";
    setProductSearch({ ...productSearch });
  }
}, [searchText]);
  

                          /**HANDLER */
    const searchCollectionHandler = (Collection: ProductCollection) => {
        productSearch.page =1;
        productSearch.productCollection = Collection;
        setProductSearch({ ...productSearch});
    };

    const searchOrderHanler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({ ...productSearch});
    };


    const searchProductHandler = () => {
      productSearch.search = searchText;
      setProductSearch({ ...productSearch});
    };

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
     productSearch.page = value;
     setProductSearch({ ...productSearch });
    };

    const chooseDishHandler = (id: string) => {
     history.push(`/products/${id}`);
    };

    return (
        <div className={"products"}>
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}>
                        <Box className = {"top-text"}>Burak Restaurant</Box>
                        <Box className={"single-search-big-box"}>
                            <input 
                             type="search"
                              className="single-search-input"
                               name="singleResearch"
                                placeholder="Type here" 
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                if (e.key === "Enter") searchProductHandler();
                                }}
                                />
                            <button className="single-button-search"
                            onClick={searchProductHandler}
                            >
                                SEARCH
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                                        <path d="M8.41887 1.51867C9.21826 2.35888 9.71858 3.46177 9.83615 4.64285C9.95372 5.82394 9.6814 7.01159 9.06475 8.00714C9.17239 8.10131 9.2621 8.2049 9.38769 8.29907C9.5671 8.44975 9.8093 8.63809 10.1143 8.85469C10.4193 9.0807 10.6167 9.22196 10.7064 9.29729C11.0831 9.58923 11.3612 9.83408 11.5496 10.0318C11.8366 10.3332 12.0878 10.644 12.3031 10.9736C12.5274 11.3032 12.6978 11.6233 12.8324 11.953C12.958 12.2826 13.0208 12.5933 12.9939 12.8947C12.9759 13.196 12.8683 13.4503 12.6709 13.6575C12.4736 13.8646 12.2314 13.9777 11.9443 13.9965C11.6662 14.0153 11.3612 13.9588 11.0562 13.8176C10.7422 13.6857 10.4283 13.4974 10.1233 13.2619C9.8093 13.0359 9.51328 12.7722 9.22622 12.4709C9.03784 12.2731 8.8046 11.9812 8.53548 11.5951C8.44578 11.4727 8.31122 11.2655 8.11387 10.9736C7.91652 10.6722 7.75505 10.4368 7.61152 10.239C7.46799 10.0507 7.35137 9.90941 7.21681 9.76816C6.28571 10.28 5.2233 10.4665 4.18424 10.3005C3.14518 10.1345 2.18371 9.62467 1.43977 8.84527C-0.479925 6.82057 -0.479925 3.53396 1.43977 1.51867C1.89783 1.03723 2.44179 0.6553 3.04056 0.394714C3.63932 0.134128 4.28114 0 4.92932 0C5.5775 0 6.21932 0.134128 6.81808 0.394714C7.41685 0.6553 7.96081 1.03723 8.41887 1.51867ZM7.15402 7.50802C7.74005 6.88831 8.06893 6.05049 8.06893 5.17726C8.06893 4.30403 7.74005 3.46621 7.15402 2.8465C6.86277 2.53984 6.51673 2.29653 6.13575 2.13051C5.75476 1.9645 5.34631 1.87904 4.93381 1.87904C4.5213 1.87904 4.11285 1.9645 3.73187 2.13051C3.35088 2.29653 3.00484 2.53984 2.71359 2.8465C2.42148 3.15225 2.18971 3.51552 2.03157 3.91547C1.87342 4.31543 1.79202 4.74422 1.79202 5.17726C1.79202 5.6103 1.87342 6.03909 2.03157 6.43905C2.18971 6.83901 2.42148 7.20227 2.71359 7.50802C3.00484 7.81468 3.35088 8.058 3.73187 8.22401C4.11285 8.39003 4.5213 8.47548 4.93381 8.47548C5.34631 8.47548 5.75476 8.39003 6.13575 8.22401C6.51673 8.058 6.86277 7.81468 7.15402 7.50802Z" fill="#D7B586"/>
                                    </svg>
                                </span>               
                            </button>
                        </Box>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button 
                                variant={"contained"}
                                color={ 
                                    productSearch.order === "createdAt" ? "primary" : "secondary"
                                }
                                className={"order"}
                                onClick={() => searchOrderHanler("createdAt")}
                            >
                                New
                            </Button>
                            <Button 
                                variant={"contained"}
                               color={ 
                                    productSearch.order === "productPrice" ? "primary" : "secondary"
                                }
                                className={"order"}
                                 onClick={() => searchOrderHanler("productPrice")}
                            >
                                Price
                            </Button>
                            <Button 
                                variant={"contained"}
                               color={ 
                                    productSearch.order === "productviews" ? "primary" : "secondary"
                                }
                                className={"order"}
                                 onClick={() => searchOrderHanler("productViews")}
                            >
                                Views
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <div className={"category-main"}>
                                <Button 
                                variant={"contained"}
                                 color={ productSearch.productCollection === ProductCollection.OTHER
                                    ?"primary"
                                    : "secondary"
                                }
                                 onClick={() =>
                                    searchCollectionHandler(ProductCollection.OTHER)
                                 }
                                 >
                                    Other
                                </Button>
                                <Button  variant={"contained"}
                                color={ productSearch.productCollection === ProductCollection.DESSERT
                                     ?"primary"
                                    : "secondary"
                                }
                                 onClick={() =>
                                    searchCollectionHandler(ProductCollection.DESSERT)
                                 }
                                 >
                                    Dessert
                                </Button>
                                <Button  variant={"contained"}
                                 color={ productSearch.productCollection === ProductCollection.DRINK
                                    ?"primary"
                                    : "secondary"
                                }
                                 onClick={() =>
                                    searchCollectionHandler(ProductCollection.DRINK)
                                 }
                                 >
                                    Drink
                                </Button>
                                <Button variant={"contained"}
                                 color={ productSearch.productCollection === ProductCollection.SALAD
                                    ?"primary"
                                    : "secondary"
                                }
                                 onClick={() =>
                                    searchCollectionHandler(ProductCollection.SALAD)
                                 }
                                 >
                                    Salad
                                </Button>
                                <Button  variant={"contained"}
                                 color={ productSearch.productCollection === ProductCollection.DISH
                                    ?"primary"
                                    : "secondary"
                                }
                                 onClick={() =>
                                    searchCollectionHandler(ProductCollection.DISH)
                                 }
                                 >
                                    Dish
                                </Button>
                            </div>
                        </Stack>

                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product: Product) => {
                                 const imagePath = `${serverApi}/${product.productImages[0]}`;
                                 const sizeVolume =
                                 product.productCollection === ProductCollection.DRINK
                                 ? product.productVolume + "litre"
                                 : product.productSize + "size";

                                    return (
                                        <Stack key={product._id}
                                         className={"product-card"}
                                            onClick={() => chooseDishHandler(product._id)}
                                            >
                                            <Stack
                                            className={"product-img"}
                                            sx={{backgroundImage: `url(${imagePath})`}}
                                            >
                                                <div className={"product-sale"}>sizeVolume</div>
                                                <Button className={"shop-btn"}>
                                                    <img src={"/icons/shopping-cart.svg"}
                                                         style={{display: "flex"}}
                                                    />
                                                </Button>
                                                <Button className={"view-btn"} sx={{ right: "36px"}}>
                                                    <Badge badgeContent={product.productViews} color="secondary">
                                                        <RemoveRedEyeIcon 
                                                        sx={{
                                                            color:
                                                             product.productViews === 0 ? "gray" : "white",
                                                        }}
                                                    />
                                                    </Badge>
                                                </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                        {product.productName}
                                                </span>
                                                <div className={"product-desc-price"}>
                                                        <MonetizationOn />
                                                        {product.productPrice}
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            ) : (
                                <Box className="no-data">Products are not available!</Box>
                            )}
                        </Stack>
                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination 
                           count={
                              products.length !== 0
                              ? productSearch.page + 1
                              : productSearch.page
                           }
                            page={productSearch.page}
                            renderItem={(item) => (
                               <PaginationItem
                                    slots={{
                                       previous: ArrowBackIcon,
                                       next: ArrowForwardIcon,
                                     }}
                                  {...item}
                                  color={"secondary"}
                                />
                            )}
                            onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className={"brands-logo"}>
                <Container className={"family-brands"}>
                    <Box className={"category-title"}>Our Family Brands</Box>
                    <Stack className={"brand-list"}>
                        <Box className={"review-box"}>
                            <img src={"/img/gurme.webp"} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"/img/seafood.webp"} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"/img/sweets.webp"} />
                        </Box>
                        <Box className={"review-box"}>
                            <img src={"/img/doner.webp"} />
                        </Box>
                    </Stack>
                </Container>
            </div>

            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}>Our address</Box>
                        <iframe
                        style={{marginTop: "60px"}}
                         src="https://www.google.com/maps?q=Hagia+Sophia,+Istanbul&output=embed"
                        width="1320"
                        height="500px"
                        referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
        </div>
    )
}