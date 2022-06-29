import { useContext } from "react";
import CartContext from "../store/cart-context";
import Input from "./Input";

const MenuItem = (props) => {
  const context = useContext(CartContext);

  const amountHandler = (amount) => {
    context.addItem({
      id: props.id,
      amount: amount,
      name: props.name,
      price: props.price,
    });
  };

  return (
    <li className="menu__card">
      <div className="menu__image">
        <img src={props.src}></img>
      </div>
      <div className="menu__text">
        <div className="menu__name">{props.name}</div>
        <div className="menu__description">{props.description}</div>
        <div className="menu__price">${props.price.toFixed(2)}</div>
      </div>
      <Input
        id={props.id}
        onAmount={amountHandler}
        input={{
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
    </li>
  );
};

export default MenuItem;
