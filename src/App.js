import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onPageLoad = () => setIsLoading(false);
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  const openCartHandler = () => {
    setCartOpen(true);
  };

  const closeCartHandler = () => {
    setCartOpen(false);
  };

  return (
    <React.Fragment>
      {isLoading && (
        <section className="loading-screen">
          <div className="loading"></div>
        </section>
      )}
      <CartProvider>
        {cartOpen && <Cart onClose={closeCartHandler}></Cart>}
        <Header onOpen={openCartHandler}></Header>
        <MenuList></MenuList>
      </CartProvider>
    </React.Fragment>
  );
}

export default App;
