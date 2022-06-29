import React, { useContext, useState } from "react";
import CartContext from "../store/cart-context";
import Modal from "./Modal";
import OrderForm from "./OrderForm";

const Cart = (props) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const context = useContext(CartContext);
  const hasItems = context.items.length > 0;

  const onAddToCartHandler = (item) => {
    context.addItem({ ...item, amount: 1 });
  };

  const onRemoveFromCartHandler = (id) => {
    context.removeItem(id);
  };

  const orderFormHandler = () => {
    setIsOrdering(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://reactmea-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: context.items }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    context.clearCart();
  };

  const cartItems = (
    <ul className="cart__list">
      {context.items.map((item) => (
        <li className="cart__item" key={item.id}>
          <div className="cart__item--name">{item.name}</div>
          <div className="cart__info">
            <div className="cart__description">
              <span className="cart__description--price">
                ${item.price.toFixed(2)}
              </span>
              <span className="cart__description--amount">x{item.amount}</span>
            </div>
            <div className="cart__amount-change">
              <button
                onClick={onRemoveFromCartHandler.bind(null, item.id)}
                className="cart__btn-change"
              >
                -
              </button>
              <button
                className="cart__btn-change"
                onClick={onAddToCartHandler.bind(null, item)}
              >
                +
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className="cart__total">
        <span className="cart__total--text">Total Amount</span>
        <span className="cart__total--amount">
          ${context.totalAmount.toFixed(2)}
        </span>
      </div>
      {isOrdering === false && (
        <div className="cart__action">
          <button
            type="button"
            title="Close"
            className="cart__btn"
            onClick={props.onClose}
          >
            Close
          </button>
          {hasItems && (
            <button
              type="button"
              onClick={orderFormHandler}
              title="Order"
              className="cart__btn"
            >
              Order
            </button>
          )}
        </div>
      )}
      {isOrdering === true && (
        <OrderForm
          onConfirm={submitOrderHandler}
          onClose={props.onClose}
        ></OrderForm>
      )}
    </>
  );

  const isSubmittingContent = (
    <p className="success-message">Sending order data...</p>
  );

  const didSubmitContent = (
    <>
      <p className="success-message">
        Successfully sent the order! You will be contacted soon.
      </p>
      <div className="cart__action">
        <button onClick={props.onClose} className="cart__btn">
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {didSubmit && !isSubmitting && didSubmitContent}
    </Modal>
  );
};

export default Cart;
