import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/cartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetails from "./features/product-list/components/ProductDetails";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import AdminHome from "./pages/AdminHome";
import { fetchLoggedInUser } from "./features/user/userAPI";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPassWordPage from "./pages/ForgotPassWordPage";
import AdminProductDetails from "./features/admin/component/AdminProductDetails";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import ProductForm from "./features/admin/component/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrderPage from "./pages/AdminOrderPage";

// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Protected>
//         <Home />
//       </Protected>
//     ),
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignUpPage />,
//   },
//   {
//     path: "/cart",
//     element: (
//       <Protected>
//         <CartPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/checkout",
//     element: (
//       <Protected>
//         <CheckOut />
//       </Protected>
//     ),
//   },
//   {
//     path: "/product-deatais/:id",
//     element: (
//       <Protected>
//         <ProductDetails />
//       </Protected>
//     ),
//   },
// ]);

function App() {
  //jyare aapde login thay tyare je data male tena mate
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      //we can get req.user by a token in backend so no need to give in frontend
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <>
      {/* <RouterProvider router={router} /> */}

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <AdminHome />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace={true} /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" replace={true} /> : <SignUpPage />}
          />
          <Route
            path="/cart"
            element={
              <Protected>
                <CartPage />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <CheckOut />
              </Protected>
            }
          />
          <Route
            path="/product-details/:id"
            element={
              <Protected>
                <ProductDetails />
              </Protected>
            }
          />
          <Route
            path="/admin/product-details/:id"
            element={
              <ProtectedAdmin>
                <AdminProductDetailsPage />
              </ProtectedAdmin>
            }
          />
          {/* // bane route par ak j page kam karse update & create*/}
          <Route
            path="/admin/product-form"
            element={
              <ProtectedAdmin>
                <AdminProductFormPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/product-form/edit/:id"
            element={
              <ProtectedAdmin>
                <AdminProductFormPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedAdmin>
                <AdminOrderPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/order-success/:id"
            element={
              <Protected>
                <OrderSuccessPage />
              </Protected>
            }
          />
          <Route
            path="/orders"
            element={
              <Protected>
                <UserOrderPage />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <UserProfilePage />
              </Protected>
            }
          />
          <Route
            path="/logout"
            element={
              <Protected>
                <Logout />
              </Protected>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassWordPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
