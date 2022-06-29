import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import CartContext from "../store/cart-context";

const HeaderNavigation = (props) => {
  const context = useContext(CartContext);
  const numberOfCartItems = context.items.reduce((prevValue, item) => {
    return prevValue + item.amount;
  }, 0);

  const [isAdded, setIsAdded] = useState(false);

  const bump = `${isAdded === true ? "bump" : ""}`;

  useEffect(() => {
    if (context.items.length === 0) return;
    setIsAdded(true);
    const timer = setTimeout(() => {
      setIsAdded(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [context.items]);

  return (
    <div className="navigation">
      <nav className="nav">
        <h1>ReactMeals</h1>
        <button className={bump} onClick={props.onOpen}>
          <span className="nav--cart-icon">
            <FontAwesomeIcon icon={faBasketShopping} />
          </span>
          <span className="nav--cart-text">Cart</span>
          <span className="nav--cart-amount">{numberOfCartItems}</span>
        </button>
      </nav>
    </div>
  );
};

export default HeaderNavigation;
