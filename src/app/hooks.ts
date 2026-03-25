import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// ═══════════════════════════════════════════════════════════════════
// REDUX HOOK'LARI — TypeScript uchun maxsus versiyalar
//
// Oddiy useDispatch va useSelector o'rniga shu hook'larni ishlatamiz.
// Sababi: TypeScript avtomatik ravishda to'g'ri turlarni biladi.
// ═══════════════════════════════════════════════════════════════════


// ── useAppDispatch ──
// Redux ga action yuborish uchun ishlatiladi.
// Oddiy useDispatch() o'rniga ishlatiladi —
// farqi: AppDispatch turi bilan TypeScript xatolarni oldindan ko'rsatadi.
//
// Ishlatish:
//   const dispatch = useAppDispatch();
//   dispatch(someAction());
export const useAppDispatch = () => useDispatch<AppDispatch>();


// ── useAppSelector ──
// Redux store dagi ma'lumotlarni o'qish uchun ishlatiladi.
// Oddiy useSelector() o'rniga ishlatiladi —
// farqi: RootState turi bilan barcha state tarmoqlari avtomatik taniladi.
//
// Ishlatish:
//   const user = useAppSelector((state) => state.userReducer.user);
//   const products = useAppSelector((state) => state.productReducer.products);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;