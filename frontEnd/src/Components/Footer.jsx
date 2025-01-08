import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const Footer = ({ isHome, count }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="fixed bottom-0 w-full bg-[#46a679] text-gray-100 shadow-lg md:relative">
      <div className="flex justify-around items-center p-2">
        <div
          onClick={() => navigate("/")}
          className="flex flex-col items-center text-sm hover:text-gray-400 cursor-pointer"
        >
          <FaHome size={20} />
          <span>Home</span>
        </div>

        {isLoggedIn ? (
          <div
            onClick={() => navigate("/user/account")}
            className="flex flex-col items-center text-sm hover:text-gray-400 cursor-pointer"
          >
            <FaUser size={20} />
            <span>You</span>
          </div>
        ) : (
          <div
            onClick={() => navigate("/user/login")}
            className="flex flex-col items-center text-sm hover:text-gray-400 cursor-pointer"
          >
            <FaUser size={20} />
            <span>Login</span>
          </div>
        )}

        <div>
          {isLoggedIn ? (
            <>
              {isHome ? (
                <div
                  className="relative flex flex-col items-center text-sm hover:text-gray-400 cursor-pointer"
                  onClick={() => navigate("/restaurant/cart")}
                >
                  <FaShoppingCart
                    title="cart"
                    size={30}
                    className="cart-icon cursor-pointer #bef264"
                  />
                  {count > 0 && (
                    <div className="absolute inline-flex items-center ml-2 justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {count > 99 ? "99+" : count}
                    </div>
                  )}
                  <span>Cart</span>
                </div>
              ) : (
                <div
                  className="relative flex flex-col items-center text-sm hover:text-gray-400 cursor-pointer"
                  onClick={() => navigate("/restaurant/cart")}
                >
                  <FaShoppingCart
                    title="cart"
                    size={30}
                    className="cart-icon cursor-pointer #bef264"
                  />
                  {count > 0 && (
                    <div className="absolute inline-flex items-center ml-2 justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {count > 99 ? "99+" : count}
                    </div>
                  )}
                  <span>Cart</span>
                </div>
              )}
            </>
          ) : (
            <>
              {isHome ? (
                <div
                  className="relative flex flex-col items-center text-sm hover:text-gray-400 cursor-pointer"
                  onClick={() => navigate("/restaurant/cart")}
                >
                  <FaShoppingCart
                    title="cart"
                    size={20}
                    className="cart-icon cursor-pointer #bef264"
                  />
                  {count > 0 && (
                    <div className="absolute inline-flex items-center ml-2 justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {count > 99 ? "99+" : count}
                    </div>
                  )}
                  <span>Cart</span>
                </div>
              ) : (
                <div
                  className="relative flex flex-col items-center text-sm hover:text-gray-400 cursor-pointer"
                  onClick={() => navigate("/restaurant/cart")}
                >
                  <FaShoppingCart
                    title="cart"
                    size={20}
                    className="cart-icon cursor-pointer #bef264"
                  />
                  {count > 0 && (
                    <div className="absolute inline-flex items-center ml-2 justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {count > 99 ? "99+" : count}
                    </div>
                  )}
                  <span>Cart</span>
                </div>
              )}
            </>
          )}
        </div>

        <div
          onClick={() => navigate("/menu/6")}
          className="flex flex-col items-center text-sm hover:text-gray-400 cursor-pointer"
        >
          <FaBars size={20} />
          <span>Menu</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
