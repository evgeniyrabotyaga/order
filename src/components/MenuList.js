import React from "react";
import MenuItem from "./MenuItem";
import { useEffect, useState } from "react";

const API_URL =
  "https://reactmea-default-rtdb.europe-west1.firebasedatabase.app/meals.json";

const MenuList = () => {
  const [meals, setMeals] = useState([]);

  const [isError, setIsError] = useState();

  const availableMeals = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    const loadedMeals = [];

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(loadedMeals);
  };

  useEffect(() => {
    availableMeals().catch((error) => {
      setIsError(error.message);
    });
  }, []);

  if (isError) {
    return (
      <section className="loading-error">
        <p className="loading-error__text">{isError}</p>
      </section>
    );
  }

  return (
    <React.Fragment>
      <section className="menu">
        <ul className="menu__list">
          {meals.map((item, index) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              src={process.env.PUBLIC_URL + `./images/item-${index + 1}.avif`}
            ></MenuItem>
          ))}
        </ul>
      </section>
    </React.Fragment>
  );
};

export default MenuList;
