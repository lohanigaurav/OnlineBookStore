import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import Card2 from "./Card2";

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
            className="container-fluid"
        >
            <h4 className="pl-4">Product Detail</h4>
            <div className="row">
                    {product && product.description && (
                        <Card2 product={product} showViewProductButton={false} />
                    )}
            </div>
            <h4 className="pl-4">Related products</h4>
            <div className="row pl-4">
                    
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
            </div>
        </Layout>
    );
};

export default Product;
