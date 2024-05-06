import { NextPage } from "next";
import styles from './index.module.scss';
import { useEffect, useState } from "react";

async function getMenu(){
    const res = await fetch('http://localhost:3000/api/burgers');
    const data = await res.json();
    return data;
}

const Orders: NextPage = () => {
    const [menu, setMenu] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMenu();
                setMenu(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className={styles.menuContainer}>
            <h1 className={styles.menuTitle}>Menu</h1>
            <ul>
                {menu.map((item, index) => (
                    <li key={index}>
                    <h2 className={styles.menuItem}>{item.title}</h2>
                    <p className={styles.menuDescription}>{item.description}</p>
                </li>
                ))}
            </ul>
        </section>
    );
}

export default Orders;