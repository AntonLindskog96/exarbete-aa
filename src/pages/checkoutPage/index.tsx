import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import styles from './index.module.scss';
import Link from 'next/link';
import Header from "@/pages/header/header";
import checkIcon from "@/assets/images/check-icon.png";
import beerIcon from "@/assets/images/beer.png";
import clockIcon from "@/assets/images/clock-icon.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddIcon from "@mui/icons-material/Add";
import {useRouter} from 'next/router'
import {generateOrderNumber} from "@/utils/generateOrderNumber";
import homeIcon from "@/assets/images/home-icon.png";


async function getMenu() {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    data.burgers.forEach((item: { id: string | number }) => (item.id = ("burger_" + item.id)));
    data.beers.forEach((item: { id: string | number }) => (item.id = ("beer_" + item.id)));
    return data;
}

const CheckoutPage = () => {
    const router = useRouter();
    const [menu, setMenu] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("burgers");
    const [cart, setCart] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderNumber,setOrderNumber] = useState('');
    const [orderTime, setOrderTime] = useState('');

    useEffect(() => {
        const newOrderNumber = generateOrderNumber();
        setOrderNumber(newOrderNumber);
        const currentTime = new Date().toLocaleTimeString();
        setOrderTime(currentTime);
    },
        []);

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

        const newTotalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
        setTotalPrice(newTotalPrice);
        localStorage.setItem("totalPrice", newTotalPrice.toString());
    }, [cart]);


    const removeItemsFromCart = () => {

        localStorage.removeItem("cartItems");
        localStorage.removeItem("totalPrice");
        router.back()
    }



    return (
        <div className={styles.outerContainer}>
            <button className={styles.navigateButton} onClick={removeItemsFromCart}>
                Meny<ArrowBackIosIcon sx={{fontSize: 30}}/>
            </button>
            <img className={styles.homeIcon} src={homeIcon.src} alt=""/>
            <section className={styles.menuContainer}>
            </section>
            <section className={styles.orderContainer}>
                <div className={styles.orderContent}>
                    <div className={styles.g}>
                        <img className={styles.checkIcon} src={checkIcon.src} alt=""/>
                        <p className={styles.orderText}>Order: {orderNumber}</p>
                    </div>
                    <h1 className={styles.menuTitle}>Tack för din beställning!</h1>
                    <div className={styles.timeContent}>
                        <p className={styles.timeText}><b>Beställningstid:</b> {orderTime}</p>
                    </div>

                    <div className={styles.timeContent}>
                        <img className={styles.clockIcon} src={clockIcon.src} alt=""/>
                        <h3 className={styles.estimatedTimeText}>Upphämtning:</h3>
                        <p className={styles.estimatedTimeText}>Din beställning kommer att vara klar för upphämtning om
                            ca 20 minuter</p>
                    </div>
                    <div className={styles.timeContent}>
                        <img className={styles.clockIcon} src={beerIcon.src} alt=""/>
                        <h3 className={styles.estimatedTimeText}>Din beställning:</h3>
                        {cart.map((item) => (
                            <li key={item.id} className={styles.cartListItem}>
                                <div className={styles.cartContent}>
                                    <p className={styles.cartItemPrice}>+ {item.title}({item.quantity})</p>
                                    <p className={styles.cartItemPrice}>{item.price}Kr</p>
                                </div>
                            </li>
                        ))}
                        <div className={styles.borderline}>
                        </div>
                        <div className={styles.totalPriceSection}>
                            <p>Summa totalt: {totalPrice} SEK</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CheckoutPage;
