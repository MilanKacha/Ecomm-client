import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { resetCart } from "../features/cart/cartAPI";
import { useEffect } from "react";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder } from "../features/order/orderSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
const OrderSuccessPage = () => {
  // param ma perameter mathi id lese automatic order-sucess/:id
  const params = useParams();
  //params.id tamne id aapse

  const dispatch = useDispatch();
  //Hav resetCart karva mate UserId joeiye
  const user = useSelector(selectLoggedInUser);

  // //reset cart & current order
  useEffect(() => {
    //reset cart
    dispatch(resetCartAsync(user.id));
    //reset current order atle biji var order thay orderSlice ma
    dispatch(resetOrder());
  }, [dispatch, user]);
  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your Orders in my account My Order
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccessPage;
