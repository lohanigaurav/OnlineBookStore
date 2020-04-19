import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card2 from "./Card2";
import Checkout from "./Checkout";

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card2
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="cart">
                <div className="row">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <hr></hr>
                <h2 className="">Your cart summary</h2>
                <div className="checkout">
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
