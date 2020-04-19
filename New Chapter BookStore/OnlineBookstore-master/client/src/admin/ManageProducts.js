import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            <h1>Total {products.length} products</h1>
            <br></br>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, i) => (
                        <tr key={i}>
                            <td scope="col">{p.name}</td>
                            <td scope="col">{p.price}</td>
                            <td scope="col">${p.quantity}</td>
                            <td scope="col">
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                            </td>
                            <td>
                            <span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </td>
                        </tr>
                        ))} 
                </tbody>
            </table>
        </Layout>
    );
};

export default ManageProducts;
