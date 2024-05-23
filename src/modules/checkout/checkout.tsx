import React, {useEffect, useState} from "react";
import styles from "@/modules/checkout/checkout.module.scss";
import Dialog from '@mui/material/Dialog';
import Radio from '@mui/material/Radio';
import swishSvgIcon from "@/assets/images/card-swish.svg";
import creditCardIcon from "@/assets/images/credit-card.png";
import Link from "next/link";
import {DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import router from "next/router";
import {ClipLoader} from "react-spinners";

interface LoginProps {

    open: boolean;
    onClose: () => void;
}


async function getMenu() {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    data.burgers.forEach((item: { id: string | number }) => (item.id = ("burger_" + item.id)));
    data.beers.forEach((item: { id: string | number }) => (item.id = ("beer_" + item.id)));
    return data;
}

const Checkout: React.FC<LoginProps> = ({open, onClose}) => {

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const [menu, setMenu] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("burgers");
    const [cart, setCart] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


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

    const handleOrder = async () => {

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push('/checkoutPage')
        },2000);
    }


    return (
        <div className={styles.outerContainer}>
            <Dialog open={open} onClose={onClose} PaperProps={{
                className: styles.checkoutPopup,
                component: 'form'
            }}>
                <CloseIcon className={styles.closeIcon} onClick={onClose}>Cancel</CloseIcon>
                <DialogTitle fontWeight={"bold"} fontSize={"40px"}
                >Min beställning</DialogTitle>
                <DialogContent>
                    <section className={styles.shoppingCartContainer}>
                        <h2 className={styles.shopping}>Min beställning</h2>
                        <div className={styles.borderline}>
                        </div>
                        <div className={styles.shoppingCartSection}>
                            <ShoppingCartOutlinedIcon className={styles.shoppingCart}/>
                            <p className={styles.quantityCounter}>{cart.reduce((total, item) => total + item.quantity, 0)}</p>
                        </div>
                        {cart.map((item) => (
                            <li key={item.id} className={styles.cartListItem}>
                                <div className={styles.cartContent}>
                                    <p className={styles.cartItemPrice}>+ {item.title}</p>
                                    <p className={styles.cartItemPrice}>{item.price}Kr</p>
                                </div>
                            </li>
                        ))}
                        <div className={styles.borderline}>
                        </div>
                        <div className={styles.totalPriceSection}>
                            <p className={styles.p}>Summa totalt: {totalPrice} SEK</p>
                        </div>
                    </section>
                    <h3 className={styles.p}>Betala med</h3>
                    <section className={styles.purchaseContent}>
                        <div className={styles.creditContent}>
                            <img src={creditCardIcon.src} className={styles.creditIcon} alt=""/>
                            <p className={styles.p}>Betalkort</p>
                            <Radio
                                checked={selectedValue === 'a'}
                                onChange={handleChange}
                                value="a"
                                name="radio-buttons"
                                inputProps={{'aria-label': 'A'}}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                    '&.Mui-checked': {
                                        color: '#b63333'
                                    },
                                }}
                            />
                            <div className={styles.borderline}>
                            </div>
                        </div>
                        <div className={styles.swishContent}>
                            <img src={swishSvgIcon.src} className={styles.swishIcon} alt=""/>
                            <p className={styles.p}>Swish</p>
                            <Radio
                                checked={selectedValue === 'b'}
                                onChange={handleChange}
                                value="b"
                                name="radio-buttons"
                                inputProps={{'aria-label': 'B'}}
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                    '&.Mui-checked': {
                                        color: '#b63333'
                                    },
                                }}
                            />
                            <div className={styles.borderline}>
                            </div>
                        </div>
                    </section>
                </DialogContent>
                    <button
                        className={styles.submitButton}
                        type="submit"
                        onClick={handleOrder}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className={styles.spinnerContainer}>
                            <ClipLoader loading={isLoading} size={24} color="#fff" />
                            </div>
                            ) : (
                                "Beställ & betala"
                        )}
                       </button>
            </Dialog>

        </div>
    );
}

export default Checkout;