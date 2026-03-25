import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material"; // MUI komponentlari
import { NavLink } from "react-router-dom"; // sahifalar orasida o'tish uchun link
import Basket from "./Basket"; // savat komponenti
import { CartItem } from "../../../lib/types/search"; // savat elementi turi
import { useGlobals } from "../../hooks/useGlobals"; // global state dan authMember olish
import { serverApi } from "../../../lib/config"; // server manzili
import { Logout } from "@mui/icons-material"; // logout ikonkasi

interface OtherNavbarProps {
  cartItems: CartItem[]; // savattagi mahsulotlar ro'yxati
  onAdd: (item: CartItem) => void; // mahsulot qo'shish
  onRemove: (item: CartItem) => void; // mahsulot kamaytirish
  onDelete: (item: CartItem) => void; // mahsulotni o'chirish
  onDeleteAll: () => void; // savatni tozalash
  setSignupOpen: (isOpen: boolean) => void; // ro'yxatdan o'tish modalini ochish
  setLoginOpen: (isOpen: boolean) => void; // kirish modalini ochish
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void; // logout menusini ochish
  anchorEl: HTMLElement | null; // logout menusi qaysi elementga bog'liq
  handleCloseLogout: () => void; // logout menusini yopish
  handleLogoutRequest: () => void; // logout amalini bajarish
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems, // savat mahsulotlari
    onAdd, // qo'shish
    onRemove, // kamaytirish
    onDelete, // o'chirish
    onDeleteAll, // hammasini o'chirish
    setSignupOpen, // signup modal
    setLoginOpen, // login modal
    handleLogoutClick, // menu ochish
    anchorEl, // menu pozitsiyasi
    handleCloseLogout, // menu yopish
    handleLogoutRequest, // chiqish
  } = props;

  const { authMember } = useGlobals(); // login bo'lgan foydalanuvchi, yo'q bo'lsa null

  return (
    <div className="other-navbar"> {/* navbar tashqi qobig'i */}
      <Container className="navbar-container"> {/* markazlashtiruvchi konteyner */}
        <Stack className="menu"> {/* gorizontal tartib */}

          {/* LOGO */}
          <Box> {/* logo o'rami */}
            <NavLink to={"/"}> {/* logoga bosilsa bosh sahifaga o'tadi */}
              <img className="brand-logo" alt="" src="/icons/burak.svg" /> {/* brend rasmi */}
            </NavLink>
          </Box>

          <Stack className="links"> {/* linklar va tugmalar qatori */}

            <Box className="hover-line"> {/* hover effekti uchun o'ram */}
              <NavLink to={"/"}>Home</NavLink> {/* bosh sahifa linki */}
            </Box>

            <Box className="hover-line">
              <NavLink to={"/products"} activeClassName="underline"> {/* aktiv bo'lsa underline */}
                Products
              </NavLink>
            </Box>

            {authMember ? ( // faqat login bo'lgan foydalanuvchiga ko'rsatiladi
              <Box className="hover-line">
                <NavLink to={"/orders"} activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}

            {authMember ? ( // faqat login bo'lgan foydalanuvchiga ko'rsatiladi
              <Box className="hover-line">
                <NavLink to={"/member-page"} activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}

            <Box className="hover-line">
              <NavLink to={"/help"} activeClassName="underline">
                Help
              </NavLink>
            </Box>

            <Basket // savat komponenti
              cartItems={cartItems} // mahsulotlar ro'yxati
              // @ts-ignore
              onAdd={onAdd} // qo'shish funksiyasi
              onRemove={onRemove} // kamaytirish funksiyasi
              onDelete={onDelete} // o'chirish funksiyasi
              onDeleteAll={onDeleteAll} // tozalash funksiyasi
            />

            {!authMember ? ( // login bo'lmagan => LOGIN tugmasi
              <Box>
                <Button
                  variant="contained" // to'ldirilgan tugma stili
                  className="login-button"
                  onClick={() => setLoginOpen(true)} // bosilsa login modal ochiladi
                >
                  Login
                </Button>
              </Box>
            ) : ( // login bo'lgan => avatar rasmi
              // eslint-disable-next-line jsx-a11y/role-supports-aria-props
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}` // o'z rasmi bo'lsa serverdan oladi
                    : "/icons/default-user.svg" // yo'q bo'lsa default rasm
                }
                alt="user img"
                aria-haspopup="true" // dropdown menusi borligini bildiradi
                onClick={handleLogoutClick} // bosilsa logout menusi ochiladi
              />
            )}

            <Menu
              anchorEl={anchorEl} // qaysi elementning tagida chiqadi
              id="account-menu"
              open={Boolean(anchorEl)} // anchorEl bor bo'lsa ochiq
              onClose={handleCloseLogout} // tashqariga bosilsa yopiladi
              onClick={handleCloseLogout} // ichiga bosilsa ham yopiladi
              PaperProps={{
                elevation: 0, // soya yo'q
                sx: {
                  overflow: "visible", // ichidagi elementlar chiqib ketishi mumkin
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))", // soya effekti
                  mt: 1.5, // yuqoridan bo'shliq
                  "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 }, // avatar o'lchami
                  "&:before": { // menyu tepasidagi uchburchak
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)", // 45 daraja burilgan kvadrat = uchburchak
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }} // menyu o'ng yuqoridan ochiladi
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }} // avatar o'ng pastidan bog'liq
            >
              <MenuItem onClick={handleLogoutRequest}> {/* logout tugmasi bosilsa chiqish */}
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} /> {/* ko'k logout ikonkasi */}
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>

          </Stack>
        </Stack>
      </Container>
    </div>
  );
}