import React, { Component } from 'react';
import { APIConfig } from '../config';

import { Review } from './review';
import { AddToCart } from './add-to-cart';

export class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetail: []
        };
    }
    async componentDidMount() {
        // Fetch product detail from API
        const productId = this.props.match.params.productId || '';
        const productFetchURL = APIConfig.baseURL + '/product?_id=' + productId;
        const productResponse = await fetch(productFetchURL);
        await productResponse.json()
                .then((collection)=>{
                    this.setState({ productDetail: collection });
                });
    }

    render(){
        // Get product detail from local state
        const productDetail = this.state.productDetail[0] || {};

        // Check if an productDetail object is empty
        if (Object.keys(productDetail).length) {
            return(
                <div>
                    {/* Product title */}
                    <div className="row product-title">
                        <div className="col">
                            { productDetail.name }
                        </div>
                    </div>

                    {/* Product details */}
                    <div className="row">
                        <div className="col-4 product-detail">
                            <img src={ APIConfig.baseURL + '/' + productDetail.image.url }/>
                        </div>
                        <div className="col">
                            <div>
                                { productDetail.description }
                            </div>
                            <div className="product-price">
                                Price: { productDetail.price } kr
                            </div>
                            <div className="product-instock">
                                In stock: { productDetail.inStock } items
                            </div>
                            <div>
                                <AddToCart product={productDetail}/>
                            </div>
                        </div>
                    </div>

                    {/* Reviews */}
                    <Review productId={productDetail._id}/>
                </div>
            )
        } else {
            return null
        }
    }
}
