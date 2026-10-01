import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { CartProvider } from "./context/CartContext";
import { LandingPage } from "./pages/LandingPage";
import { SingleFamilyBankingPage } from "./pages/SingleFamilyBankingPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { PaymentsPage } from "./pages/PaymentsPage";


// Sentry.init({
//     dsn: process.env.SENTRY_DSN,
//     // Effectively halts all Sentry event transmission completely
//     enabled: false
// });

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/single-family" element={<SingleFamilyBankingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/checkout" element={<PaymentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
