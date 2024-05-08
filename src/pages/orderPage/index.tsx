import { NextPage } from "next";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";

async function getMenu() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  data.burgers.forEach((item: { isBeer: boolean }) => (item.isBeer = false));
  data.beers.forEach((item: { isBeer: boolean }) => (item.isBeer = true));
  return data;
}

const Orders: NextPage = () => {
  const [menu, setMenu] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("burgers");
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenu();
        setMenu(data[selectedCategory]);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCart(JSON.parse(storedCartItems));
    }
  }, []);

  const addToCart = (item: any) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  return (
    <div className={styles.outerContainer}>
      <section className={styles.menuContainer}>
        <h1 className={styles.menuTitle}>Meny</h1>
        <div className={styles.buttonContainer}>
          <button
            className={styles.productButton}
            onClick={() => setSelectedCategory("burgers")}
          >
            Burgare
          </button>
          <button
            className={styles.productButton}
            onClick={() => setSelectedCategory("beers")}
          >
            Öl
          </button>
        </div>
        <ul className={styles.ul}>
          {menu.map((item, index) => (
            <button
              key={index}
              onClick={() => addToCart(item)}
              className={styles.menuButton}
            >
              <div className={styles.menuItemContainer}>
                <div className={styles.menuItemContent}>
                  <h2 className={styles.menuItemTitle}>{item.title}</h2>
                  <h2 className={styles.menuItemTitle}>{item.price}Kr</h2>
                </div>
                <img
                  src={
                    selectedCategory === "beers" ? item.imagebeer : item.image
                  }
                  className={`${styles.menuItemImage} ${
                    selectedCategory === "beers" ? styles.imageBeer : ""
                  }`}
                  alt={item.title}
                />
              </div>
            </button>
          ))}
        </ul>
      </section>
      <section className={styles.shoppingCartContainer}>
        <h2 className={styles.shopping}>Min Beställning</h2>
        <ul className={styles.ulcart}>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartListItem}>
              <img
                src={item.isBeer ? item.imagebeer : item.image}
                className={`${styles.cartItemImage} ${
                  item.isBeer ? styles.cartItemImageBeer : ""
                }`}
                alt={item.title}
              />

              <div className={styles.cartContent}>
                <p className={styles.cartItemPrice}>{item.title}</p>
                <p className={styles.cartItemPrice}>{item.price}Kr</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Orders;
