import StartPage from "@/pages/startPage";
import {useEffect, useState} from "react";
import React from 'react';
import {Modal} from "@mui/base";
import styles from "@/modules/checkout/checkout.module.scss";
import Dialog from '@mui/material/Dialog';
import Radio from '@mui/material/Radio';
import swishSvgIcon from "@/assets/images/card-swish.svg";
import creditCardIcon from "@/assets/images/credit-card.png";
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {set} from "immutable";
import {fontSize} from "@mui/system";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {useRouter} from "next/router";

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


    const [isLogin, setIsLogin] = useState(true);
    const [formError, setFormError] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormError(null);
    };

    const togglePasswordVisibility = () => {

        setIsPasswordVisible(prev => !prev);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        const {email, password} = formJson;

        if (isLogin) {

            const storedUser = JSON.parse(localStorage.getItem(email as string) as string)
            console.log("Stored user:", storedUser);
            console.log("Entered Password:", password);


            if (!storedUser || storedUser.password !== password) {
                setFormError("Fel email eller password");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify({email}));
            onClose();

        } else {
            const {confirmPassword} = formJson;

            if (password !== confirmPassword) {
                setFormError("Lösenorden matchar inte");
                return;
            }
            localStorage.setItem(email as string, JSON.stringify({email, password}));
            localStorage.setItem("currentUser", JSON.stringify({email}));
            onClose();

        }
    };


    const router = useRouter();
    const [menu, setMenu] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("burgers");
    const [cart, setCart] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

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


    return (
        <div className={styles.outerContainer}>
            <Dialog open={open} onClose={onClose} PaperProps={{
                className: styles.checkoutPopup,
                component: 'form',
                onSubmit: handleSubmit,
            }}>
                <CloseIcon className={styles.closeIcon} onClick={onClose}>Cancel</CloseIcon>
                <DialogTitle fontWeight={"bold"}
                             >Min beställning</DialogTitle>
                <DialogContent>
                    <section className={styles.shoppingCartContainer}>
                        <h2 className={styles.shopping}>Min Beställning</h2>
                        <div className={styles.borderline}>
                        </div>
                        <div className={styles.shoppingCartSection}>
                            <ShoppingCartOutlinedIcon className={styles.shoppingCart}/>
                            <p className={styles.quantityCounter}>{cart.reduce((total, item) => total + item.quantity, 0)}</p>
                        </div>
                        {cart.map((item) => (
                            <li key={item.id} className={styles.cartListItem}>
                                {/*<img*/}
                                {/*    src={item.imagebeer ? item.imagebeer : item.imageburger}*/}
                                {/*    className={`${styles.cartItemImage} ${*/}
                                {/*        item.imagebeer ? styles.cartItemImageBeer : ""*/}
                                {/*    }`}*/}
                                {/*    alt={item.title}*/}
                                {/*/>*/}
                                <div className={styles.cartContent}>
                                    <p className={styles.cartItemPrice}>+ {item.title}</p>
                                    <p className={styles.cartItemPrice}>{item.price}Kr</p>
                                </div>
                            </li>
                        ))}
                        <div className={styles.borderline}>
                        </div>
                        <div className={styles.totalPriceSection}>
                            <p>Summa totalt: {totalPrice} SEK</p>
                        </div>
                    </section>
                    <h3>Betala som gäst med</h3>
                    <section className={styles.purchaseContent}>
                        <div className={styles.creditContent}>
                            <img src={creditCardIcon.src} className={styles.creditIcon} alt=""/>
                            <p>Betalkort</p>
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
                            <p>Swish</p>
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
                    {/*<DialogContentText>*/}
                    {/*    {formError && <p className={styles.errorText}>{formError}</p>}*/}
                    {/*</DialogContentText>*/}
                    {/*<TextField*/}
                    {/*    autoFocus*/}
                    {/*    required*/}
                    {/*    margin="dense"*/}
                    {/*    id="name"*/}
                    {/*    name="email"*/}
                    {/*    label="Email Address"*/}
                    {/*    type="email"*/}
                    {/*    fullWidth*/}
                    {/*    variant="standard"*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    autoFocus*/}
                    {/*    required*/}
                    {/*    margin="dense"*/}
                    {/*    id="name"*/}
                    {/*    name="password"*/}
                    {/*    label="Lösenord"*/}
                    {/*    type={isPasswordVisible ? "text" : "password"}*/}
                    {/*    fullWidth*/}
                    {/*    variant="standard"*/}
                    {/*    InputProps={{*/}
                    {/*        endAdornment: (*/}
                    {/*            <InputAdornment position="end">*/}
                    {/*                <IconButton*/}
                    {/*                    onClick={togglePasswordVisibility}*/}
                    {/*                    edge="end"*/}
                    {/*                >*/}
                    {/*                    {isPasswordVisible ? <VisibilityOff/> : <Visibility/>}*/}
                    {/*                </IconButton>*/}
                    {/*            </InputAdornment>*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*/>*/}
                    {/*{!isLogin && (*/}
                    {/*    <TextField*/}
                    {/*        autoFocus*/}
                    {/*        required*/}
                    {/*        margin="dense"*/}
                    {/*        id="name"*/}
                    {/*        name="confirmPassword"*/}
                    {/*        label="Bekräfta lösenord"*/}
                    {/*        type={isPasswordVisible ? "text" : "password"}*/}
                    {/*        fullWidth*/}
                    {/*        variant="standard"*/}
                    {/*        InputProps={{*/}
                    {/*            endAdornment: (*/}
                    {/*                <InputAdornment position="end">*/}
                    {/*                    <IconButton*/}
                    {/*                        onClick={togglePasswordVisibility}*/}
                    {/*                        edge="end"*/}
                    {/*                    >*/}
                    {/*                        {isPasswordVisible ? <VisibilityOff/> : <Visibility/>}*/}
                    {/*                    </IconButton>*/}
                    {/*                </InputAdornment>*/}
                    {/*            ),*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*)}*/}
                </DialogContent>
                <button className={styles.submitButton} type="submit">Beställ & betala</button>
                <DialogActions>
                    <p className={styles.registrationText} onClick={toggleForm}>
                    </p>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default Checkout;