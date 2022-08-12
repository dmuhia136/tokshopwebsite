import { lazy, Suspense } from "react";
import Loading from "shared/components/common/Loading";
import { Route, Routes } from "react-router-dom";

import Home from "Layouts/Home/Home";
import Product from "modules/Product/views/Product";
import Rooms from "modules/Rooms/views/Rooms";
import Searching from "modules/Search/views/Searching";
import Wallet from "modules/Wallet/views/Wallet";
import Landing from "shared/components/Landing/Landing";
import Shop from "modules/shop/Views/shop";
import { RequireAuth } from "shared/RouteProtection/Protector";
import EditProfile from "modules/Manage/components/profile/EditProfile";
import MyOrders from "modules/Orders/views/MyOrders";
import MyShopsRoutes from "modules/Manage/routes/MyShopRoutes";
import { AuthStatus } from "shared/RouteProtection/Protector";

const Account = lazy(() => import("Layouts/Account/Account"));
const Orders = lazy(() => import("modules/Orders/routes/Orders"));
const Live = lazy(() => import("modules/Live/views/Live"));
const Register = lazy(
  () => import("modules/Auth/components/Register/Register")
);
const Login = lazy(() => import("modules/Auth/components/Login"));

const App = () => {
  return (
    <Suspense fallback={Loading}>
      <Routes>
        {/* home routes */}
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Landing />} />
          <Route path="/searching" element={<Searching />} />
          <Route
            path="/wallet"
            element={
              <RequireAuth>
                <Wallet />
              </RequireAuth>
            }
          />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/shop/:shopId" element={<Shop />} />
          <Route
            path="/rooms/:roomId"
            element={
              <RequireAuth>
                <Rooms />
              </RequireAuth>
            }
          />
          <Route
            path="/orders/*"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/live/*"
            element={
              <RequireAuth>
                <Live />
              </RequireAuth>
            }
          />
        </Route>
        {/* myaccount routes */}
        <Route
          path="/myAccount"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        >
          <Route path="/myAccount/profile" element={<EditProfile />} />
          <Route path="/myAccount/shops/*" element={<MyShopsRoutes />} />
          <Route path="/myAccount/orders" element={<MyOrders />} />
        </Route>
        {/* authroutes */}
        <Route
          path="/login"
          element={
            <AuthStatus>
              <Login />
            </AuthStatus>
          }
        />
        <Route
          path="/register"
          element={
            <AuthStatus>
              <Register />
            </AuthStatus>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
