import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

// ═══════════════════════════════════════════════════════
// PROPS — bu komponentga tashqaridan keladigan ma'lumotlar
// ═══════════════════════════════════════════════════════
interface HomeNavbarProps {

  // --- Savat (Basket) uchun ---
  cartItems: CartItem[];                    // savattagi mahsulotlar ro'yxati
  onAdd: (item: CartItem) => void;          // mahsulot qo'shish
  onRemove: (item: CartItem) => void;       // mahsulot kamaytirish
  onDelete: (item: CartItem) => void;       // mahsulotni o'chirish
  onDeleteAll: () => void;                  // savatni tozalash

  // --- Modal oynalar uchun ---
  setSignupOpen: (isOpen: boolean) => void; // ro'yxatdan o'tish modal
  setLoginOpen: (isOpen: boolean) => void;  // kirish modal

  // --- Logout menusi uchun ---
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void; // menuni ochish
  anchorEl: HTMLElement | null;             // menu qaysi elementga bog'liq
  handleCloseLogout: () => void;            // menuni yopish
  handleLogoutRequest: () => void;          // logout amalini bajarish
}

export default function HomeNavbar(props: HomeNavbarProps) {

  // ── Proplarni destructuring qilish (ajratib olish) ──
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  // ── Global state dan foydalanuvchi ma'lumoti ──
  // authMember: login bo'lgan bo'lsa — foydalanuvchi obyekti, bo'lmasa — null
  const { authMember } = useGlobals();

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">

          {/* ── LOGO ── */}
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" />
            </NavLink>
          </Box>

          {/* ── NAVIGATSIYA LINKLARI VA AMALLAR ── */}
          <Stack className="links">

            {/* Asosiy sahifalar */}
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName={"underline"}>Home</NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/Products" activeClassName={"underline"}>Products</NavLink>
            </Box>

            {/* Faqat login bo'lgan foydalanuvchiga ko'rsatiladi */}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/oreders" activeClassName={"underline"}>Orders</NavLink>
              </Box>
            ) : null}

            {/* Faqat login bo'lgan foydalanuvchiga ko'rsatiladi */}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName={"underline"}>My Page</NavLink>
              </Box>
            ) : null}

            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName={"underline"}>help</NavLink>
            </Box>

            {/* ── SAVAT (BASKET) ── */}
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {/* ── FOYDALANUVCHI TUGMASI ──
                Login bo'lmagan  =>  LOGIN tugmasi ko'rsatiladi
                Login bo'lgan    =>  Avatar rasmi ko'rsatiladi  */}
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  LOGIN
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup="true"
                onClick={handleLogoutClick}
              />
            )}

            {/* ── LOGOUT MENUSI ──
                Avatar bosilganda chiqadigan dropdown menu
                anchorEl bor bo'lsa ochiq, yo'q bo'lsa yopiq */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* Logout tugmasi */}
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

          </Stack>
        </Stack>

        {/* ══════════════════════════════════════════
            HERO SECTION — Bosh sahifadagi katta sarlavha
        ══════════════════════════════════════════ */}
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>

            {/* Asosiy matnlar */}
            <Box className={"head-main-txt"}>
              World's Most Delicious Cousine
            </Box>
            <Box className={"wel-txt"}>The Choice, not just a choice</Box>
            <Box className={"service-txt"}>24 hours service</Box>

            {/* SIGN UP tugmasi — faqat login bo'lmagan foydalanuvchiga */}
            <Box className={"signup"}>
              {!authMember ? (
                <Button
                  variant={"contained"}
                  className={"signup-button"}
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              ) : null}
            </Box>

          </Stack>

          {/* Logo rasmi */}
          <Box className={"logo-frame"}>
            <div className={"logo-img"}></div>
          </Box>
        </Stack>

      </Container>
    </div>
  );
}
         