import { NextPage } from "next";
import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRouter } from "next/router";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Navback from "../componets/navback/navback";
import CheckoutButton from "../componets/buttons/paymentButton";
import Footer from "../componets/footer/footer";

async function getMenu() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  data.burgers.forEach(
    (item: { id: string | number }) => (item.id = "burger_" + item.id)
  );
  data.beers.forEach(
    (item: { id: string | number }) => (item.id = "beer_" + item.id)
  );
  data.sides.forEach(
    (item: { id: string | number }) => (item.id = "side_" + item.id)
  );

  return data;
}

const Orders: NextPage = () => {
  const [menu, setMenu] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("burgers");
  const [cart, setCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest: number) => Math.round(latest));
  const [activeLink,setActiveLink] = useState<string | null>("burgers")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getMenu();
        setMenu(data[selectedCategory]);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCart(JSON.parse(storedCartItems));
    }

    const storedTotalPrice = localStorage.getItem("totalPrice");
    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    }
  }, []);

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    animate(count, newTotalPrice, {
      duration: 0.5,
      type: "tween",
    });

    setTotalPrice(newTotalPrice);
    localStorage.setItem("totalPrice", newTotalPrice.toString());
  }, [cart]);

  const addToCart = (item: any) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }

    if (item.isBeer) {
      console.log(`${item.title} is added to the cart`);
    }
    if (item.isBurger) {
      console.log(`${item.title} is added to the cart`);
    }
    if (item.isSide) {
      console.log(`${item.title} is added to the cart`);
    }
  };

  const removeFromCart = (item: any) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (cart[existingItemIndex].quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity -= 1;
      setCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart];
      updatedCart.splice(existingItemIndex, 1);
      setCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const handleLinkClick = (link:string) => {
    setActiveLink(link);
    setSelectedCategory(link);
  };

  return (
    <section>
      <div className={styles.outerContainer}>
        <section className={styles.menuContainer}>
          <Navback />
          <h1 className={styles.menuTitle}>PINTS & PATTIES MENY</h1>
          <div className={styles.borderBottom}>
          </div>

          <div className={styles.buttonContainer}>
            <a
              className={`${styles.productButton} ${activeLink === "burgers" ? styles.active : ""}`}
              onClick={() => handleLinkClick("burgers")}
            >
              Burgare
            </a>
            <a
                className={`${styles.productButton} ${activeLink === "beers" ? styles.active : ""}`}
              onClick={() => handleLinkClick("beers")}
            >
              Öl
            </a>
            <a
                className={`${styles.productButton} ${activeLink === "sides" ? styles.active : ""}`}
              onClick={() => handleLinkClick("sides")}
            >
              Tillbehör
            </a>
          </div>
            <motion.ul className={styles.ulmenu}>
              {menu.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => addToCart(item)}
                  className={styles.menuButton}
                  whileTap={{ scale: 0.8 }}
                >
                  <div className={styles.menuItemContainer}>
                    <div className={styles.menuItemContent}>
                      <h2 className={styles.menuItemTitle}>{item.title}</h2>
                      <h2 className={styles.menuItemTitle}>{item.price}Kr</h2>
                    </div>
                    <img
                      src={
                        selectedCategory === "beers"
                          ? item.imagebeer
                          : selectedCategory === "sides"
                          ? item.imageside
                          : item.imageburger
                      }
                      className={`${styles.menuItemImage} ${
                        selectedCategory === "beers" ? styles.imageBeer : ""
                      }`}
                      alt={item.title}
                    />
                    {item.isNew && <span className={styles.ribbon}>HOT</span>}
                  </div>
                </motion.button>
              ))}
            </motion.ul>
          )
        </section>
        <section className={styles.shoppingCartContainer}>
          <h2 className={styles.shopping}>Min Beställning</h2>
          <div className={styles.shoppingCartSection}>
            <ShoppingCartOutlinedIcon className={styles.shoppingCart} />
            <p className={styles.quantityCounter}>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </p>
          </div>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartListItem}>
              <img
                src={item.imageside ? item.imageside : item.imagebeer ? item.imagebeer : item.imageburger}
                className={`${styles.cartItemImage} ${
                  item.imagebeer ? styles.cartItemImageBeer : ""
                }`}
                alt={item.title}
              />
              <div className={styles.cartContent}>
                <p className={styles.cartItemPrice}>{item.title}</p>
                <p className={styles.cartItemPrice}>{item.price}Kr</p>
              </div>
              <motion.div className={styles.shoppingCartButtons}>
                <motion.button
                  className={styles.removeButton}
                  whileTap={{ scale: 0.5 }}
                  onClick={() => removeFromCart(item)}
                >
                  {item.quantity === 1 ? (
                    <DeleteOutlineSharpIcon />
                  ) : (
                    <RemoveSharpIcon />
                  )}
                </motion.button>
                <p>({item.quantity})</p>
                <motion.button
                  className={styles.addButton}
                  whileTap={{ scale: 0.5 }}
                  onClick={() => addToCart(item)}
                >
                  <AddIcon />
                </motion.button>
              </motion.div>
            </li>
          ))}
          {cart.length > 0 && <CheckoutButton rounded={rounded} />}
        </section>
      </div>
      <Footer />
    </section>
  );
};

export default Orders;
