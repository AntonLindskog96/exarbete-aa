import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';
import Link from 'next/link';
import Header from "@/pages/header/header";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddIcon from "@mui/icons-material/Add";
import {useRouter} from 'next/router'


async function getMenu() {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    data.burgers.forEach((item: { id: string | number}) => (item.id = ("burger_" + item.id)));
    data.beers.forEach((item: { id: string | number}) => (item.id = ("beer_" + item.id)));
    return data;
}
const CheckoutPage = () => {
    const router = useRouter();
    const [menu, setMenu] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("burgers");
    const [cart, setCart] = useState<any[]>([]);
    const [totalPrice,setTotalPrice] = useState(0);

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

        const storedTotalPrice = localStorage.getItem("totalPrice");
        if (storedTotalPrice) {
            setTotalPrice(parseFloat(storedTotalPrice));
        }

    }, []);

    useEffect(() => {

        const newTotalPrice = cart.reduce((total,item) => total + (item.quantity * item.price), 0);
        setTotalPrice(newTotalPrice);
        localStorage.setItem("totalPrice", newTotalPrice.toString());
    }, [cart]);


    return (
        <div className={styles.outerContainer}>
            <section className={styles.menuContainer}>
                <button className={styles.navigateButton} onClick={() => router.back()}>
                    Meny<ArrowBackIosIcon sx={{ fontSize: 30 }}/>
                </button>
                <h1 className={styles.menuTitle}>Min beställning</h1>
                <ul className={styles.ul}>
                </ul>
            </section>
            <div className={styles.checkoutButtonSection}>
                    <button className={styles.checkoutButton}>Beställ & betala {totalPrice} SEK</button>
            </div>
            <section className={styles.shoppingCartContainer}>
                <h2 className={styles.shopping}>Min Beställning</h2>
                <div className={styles.shoppingCartSection}>
                    <ShoppingCartOutlinedIcon className={styles.shoppingCart}/>
                    <p className={styles.quantityCounter}>{cart.reduce((total, item) => total + item.quantity, 0)}</p>
                </div>
                {cart.map((item) => (
                    <li key={item.id} className={styles.cartListItem}>
                        <img
                            src={item.imagebeer ? item.imagebeer : item.imageburger}
                            className={`${styles.cartItemImage} ${
                                item.imagebeer ? styles.cartItemImageBeer : ""
                            }`}
                            alt={item.title}
                        />
                        <div className={styles.cartContent}>
                            <p className={styles.cartItemPrice}>{item.title}</p>
                            <p className={styles.cartItemPrice}>{item.price}Kr</p>
                        </div>
                        <p>Summa totalt: ${totalPrice}</p>
                    </li>
                ))}
                <ul className={styles.ulcart}>
                </ul>
            </section>
        </div>
    );
};

export default CheckoutPage;
