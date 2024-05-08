import { NextPage } from "next";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";

async function getMenu() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
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

  const addToCart = (item: any) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
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
             </div>
             <img
               src={item.image}
               className={styles.menuItemImage} // Apply a class for styling
               alt={item.title}
             />
           </div>
         </button>
       ))}
      </ul>
      <div>
        <h2 className={styles.menuTitle}>Shopping Cart</h2>
        <ul className={styles.ul}>
          {cart.map((item, index) => (
            <li key={index}>
              <h3>{item.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Orders;
