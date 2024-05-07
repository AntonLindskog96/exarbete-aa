import { NextPage } from "next";
import styles from './index.module.scss';
import { useEffect, useState } from "react";

async function getMenu(){
    const res = await fetch('http://localhost:3000/api/products');
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
                console.error('Error fetching menu:', error);
            }
        };

        fetchData();
    }, [selectedCategory]);

    const addToCart = (item: any) => {
        setCart(prevCart => [...prevCart, item]);
    };

    return (
        <section className={styles.menuContainer}>
            <h1 className={styles.menuTitle}>Menu</h1>
            <button className="productButton" onClick={() => setSelectedCategory("burgers")}>Burgers</button>
            <button className="productButton" onClick={() => setSelectedCategory("beers")}>Beers</button>
            <ul>
                {menu.map((item, index) => (
                    <li key={index} onClick={() => addToCart(item)}>
                    <h2 className={styles.menuItem}>{item.title}</h2>
                </li>
                ))}
            </ul>
            <div>
                <h2>Shopping Cart</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            <h3>{item.title}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Orders;