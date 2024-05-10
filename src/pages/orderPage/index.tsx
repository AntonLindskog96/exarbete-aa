import {NextPage} from "next";
import styles from "./index.module.scss";
import {useEffect, useState} from "react";
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

async function getMenu() {
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
    data.burgers.forEach((item: { id: string | number}) => (item.id = ("burger_" + item.id)));
    data.beers.forEach((item: { id: string | number}) => (item.id = ("beer_" + item.id)));
    return data;
}

const Orders: NextPage = () => {
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
    }, []);

    const addToCart = (item: any) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {

            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            setTotalPrice(totalPrice + item.price)
        } else {
            const updatedCart = [...cart, {...item, quantity: 1}];
            setCart(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            setTotalPrice(totalPrice + item.price);
        }

        if (item.isBeer) {
            console.log(`${item.title} is added to the cart`);
        }
        if (item.isBurger) {
            console.log(`${item.title} is added to the cart`);
        }
    };

    const removeFromCart = (item: any) => {

        const existingItemIndex = cart.findIndex((cartItem => cartItem.id === item.id));

        if (cart[existingItemIndex].quantity > 1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity -= 1;
            setCart(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart))
            setTotalPrice(totalPrice - item.price);
        } else {
            const updatedCart = [...cart];
            updatedCart.splice(existingItemIndex, 1);
            setCart(updatedCart)
            localStorage.setItem("cartItems", JSON.stringify(updatedCart))
            setTotalPrice(totalPrice - item.price);
        }
    }

    return (
        <div className={styles.outerContainer}>
            <section className={styles.menuContainer}>
                <h1 className={styles.menuTitle}>Meny</h1>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.productButton}
                        onClick={() => setSelectedCategory("burgers")}
                    >Burgare
                    </button>
                    <button
                        className={styles.productButton}
                        onClick={() => setSelectedCategory("beers")}
                    >Öl
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
                                        selectedCategory === "beers" ? item.imagebeer : item.imageburger
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
            <div className={styles.checkoutButtonSection}>
                <button className={styles.checkoutButton}>Till Betalning {totalPrice} SEK</button>
                <p>Total Price: ${totalPrice}</p>
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
                        <div className={styles.shoppingCartButtons}>
                            <button className={styles.removeButton} onClick={() => removeFromCart(item)}>
                                {item.quantity === 1 ? <DeleteOutlineSharpIcon/> : <RemoveSharpIcon/>}
                            </button>
                            <p>({item.quantity})</p>
                            <button className={styles.addButton} onClick={() => addToCart(item)}>
                                <AddIcon/>
                            </button>
                        </div>
                    </li>
                ))}
                <ul className={styles.ulcart}>
                </ul>
            </section>
        </div>
    );
};

export default Orders;
