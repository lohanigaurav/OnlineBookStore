import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h3 className="mb-4">
                    Total orders: {orders.length}
                </h3>
            );
        } else {
            return <h3 className="mb-4">No orders</h3>;
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <p>{o.status}</p>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout
            title="Orders"
            description={`G'day ${
                user.name
            }, you can manage all the orders here`}
        >
            
            <div className="p-5">
            {showOrdersLength()}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Order #</th>
                        <th scope="col">Transaction #</th>
                        <th scope="col">Purchased On</th>
                        <th scope="col">Order under Name</th>
                        <th scope="col">Total</th>
                        <th scope="col">Delivery</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                
                {orders.map((o, oIndex) => {
                        return (
                            <tbody>
                            <tr className="mt-5 table-success" key={oIndex}>
                                <td scope="row">{o._id}</td>
                                <td>{o.transaction_id}</td>
                                <td>{moment(o.createdAt).fromNow()}</td>
                                <td>{o.user.name}</td>
                                <td>${o.amount}</td>
                                <td>{o.address}</td>
                                <td>{showStatus(o)}</td>
                            </tr>
                            {/* <tr>
                                <td colSpan="2"></td>
                                <td colSpan="2">Product List</td>
                            </tr> */}
                            <tr>
                                <td colSpan="3">Total Products: {o.products.length}</td>
                                <td scope="col">Product #</td>
                                <td scope="col">Product Name</td>
                                <td scope="col">Product Price</td>
                                <td scope="col">Product Total</td>
                            </tr>
                            {o.products.map((p, pIndex) => (
                                <tr key={pIndex}>
                                    <td colSpan="3"></td>
                                    <td scope="col">{p._id}</td>
                                    <td scope="col">{p.name}</td>
                                    <td scope="col">${p.price}</td>
                                    <td scope="col">{p.count}</td>
                                </tr>
                            ))}
                            </tbody>
                        );
                    })}
                
            </table>
        
            </div>
            </Layout>
    );
};

export default Orders;
