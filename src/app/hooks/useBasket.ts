import { useState } from "react";
import { CartItem } from "../../lib/types/search";
 
const useBasket = () => {
 
  // ── localStorage dan savatni o'qish ──
  // Sahifa yangilansa ham savat saqlanib qoladi
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : []; // bor bo'lsa parse qil, yo'q bo'lsa bo'sh array
 
  // ── Savat holati (state) ──
  // cartItems    — ekranda ko'rinadigan mahsulotlar ro'yxati
  // setCartItems — ro'yxatni yangilash funksiyasi
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);
 
  // ═══════════════════════════════════════════════════════
  // MAHSULOT QO'SHISH
  // ═══════════════════════════════════════════════════════
  const onAdd = (input: CartItem) => {
 
    // Savatta bu mahsulot bor-yo'qligini tekshiramiz
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );
 
    if (exist) {
      // Bor bo'lsa — faqat miqdorini (quantity) +1 qilamiz
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      // Yo'q bo'lsa — yangi mahsulot sifatida oxiriga qo'shamiz
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };
 
  // ═══════════════════════════════════════════════════════
  // MAHSULOT KAMAYTIRISH
  // ═══════════════════════════════════════════════════════
  const onRemove = (input: CartItem) => {
 
    // Mahsulotni topamiz
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );
 
    if (exist.quantity === 1) {
      // Miqdor 1 ta bo'lsa — savatdan butunlay o'chiramiz
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      // Miqdor 1 dan ko'p bo'lsa — faqat -1 qilamiz
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };
 
  // ═══════════════════════════════════════════════════════
  // BITTA MAHSULOTNI TO'LIQ O'CHIRISH
  // ═══════════════════════════════════════════════════════
  const onDelete = (input: CartItem) => {
    // filter — faqat ID si mos kelmaydigan mahsulotlarni qoldiradi
    // ya'ni tanlangan mahsulot ro'yxatdan chiqariladi
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id != input._id
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };
 
  // ═══════════════════════════════════════════════════════
  // SAVATNI TO'LIQ TOZALASH
  // ═══════════════════════════════════════════════════════
  const onDeleteAll = () => {
    setCartItems([]);                      // state ni bo'shatamiz
    localStorage.removeItem("cartData");   // localStorage dan ham o'chiramiz
  };
 
  // ── Tashqariga chiqariladigan qiymatlar ──
  // Bu hook ishlatilgan joyda shu funksiyalar va ma'lumotlar mavjud bo'ladi
  return {
    cartItems,    // savattagi mahsulotlar ro'yxati
    onAdd,        // qo'shish
    onRemove,     // kamaytirish
    onDelete,     // bitta mahsulotni o'chirish
    onDeleteAll,  // hammasini o'chirish
  };
};
 
export default useBasket;