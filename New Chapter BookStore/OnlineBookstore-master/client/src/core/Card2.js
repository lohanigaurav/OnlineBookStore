import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        View Product
                    </button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn addToCart mt-2 mb-2 float-right"
                >
                    Add to cart
                </button>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill float-right">In Stock</span>
        ) : (
            <span className="badge badge-primary badge-pill float-right">Out of Stock</span>
        );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Adjust Quantity
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };

    return (
        <div className="card2">
            {/* <div className="card-header name"></div> */}
            <div className="card-body container">
                {shouldRedirect(redirect)}
                <div className="row pl-4">
                    <div className="col-4">
                        <Link to={`/product/${product._id}`} className="mr-2">
                            <ShowImage item={product} url="product" />
                        </Link>
                    </div>
                    <div className="col-8">
                       {showStock(product.quantity)}   
                        <h3>{product.name}</h3> 
                        <p>
                            by {product.description.substring(0, 100)}
                        </p>
                        <p>${product.price}</p>  
                        <p>Category: {product.category && product.category.name}</p>
                        <p>Added on {moment(product.createdAt).fromNow()}</p>
                           

                        {/* {showViewButton(showViewProductButton)} */}

                        {showAddToCart(showAddToCartButton)}

                        {showRemoveButton(showRemoveProductButton)}

                        {showCartUpdateOptions(cartUpdate)}
                    </div>
                </div>       
            </div>
        </div>
    );
};

export default Card;
