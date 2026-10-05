import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { CartProvider } from "./context/CartContext";
import { LandingPage } from "./pages/LandingPage";
import { SingleFamilyBankingPage } from "./pages/SingleFamilyBankingPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { ClientSetupPage } from "./pages/ClientSetupPage";
import { FirstStepsPage } from "./pages/FirstStepsPage";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/first-steps" element={<FirstStepsPage />} />
          <Route path="/single-family" element={<SingleFamilyBankingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/checkout/setup" element={<ClientSetupPage />} />
          <Route path="/checkout" element={<PaymentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
