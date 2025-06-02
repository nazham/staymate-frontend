import { BrowserRouter, Route, Routes } from "react-router";
import AdminProtectedLayout from "./layouts/admin-protected-layout";
import MainLayout from "./layouts/main.layout";
import ProtectedLayout from "./layouts/protected.layout";
import RootLayout from "./layouts/root-layout.layout";
import AccountPage from "./pages/account-page";
import CreateHotelPage from "./pages/create-hotel.page";
import HomePage from "./pages/home.page";
import HotelPage from "./pages/hotel.page";
import HotelsPage from "./pages/hotels.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/hotels/:id" element={<HotelPage />} />
              <Route element={<ProtectedLayout />}>
                <Route path="/account" element={<AccountPage />} />
                <Route element={<AdminProtectedLayout />}>
                  <Route path="/hotels/create" element={<CreateHotelPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
