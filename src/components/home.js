import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../lib'; // For using own String.prototype

import { APIConfig } from '../config';
import { AddToCart } from './add-to-cart';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productList: []
        };
    }

    async componentDidMount() {
        // Get all products from API
        const controller = new AbortController();
        const signal = controller.signal;

        const productFetchURL = APIConfig.baseURL + '/product?_sort=name:asc';
        const productResponse = await fetch(productFetchURL, signal);
        await productResponse.json()
                .then((collection)=>{
                    controller.abort();
                    this.setState({ productList: collection });
                });
    }

    handleSort = (e) => {
        let orderBy = '';
        switch (e.target.value) {
            case '1':
                orderBy = 'price'; // Sort by price
                break;
            case '2':
                orderBy = 'inStock'; // Sort by stock quantity
                break;
            default:
                orderBy = 'name';
                break;
        }
        
        if (orderBy !== 'name') {
            const sortedProductList = this.state.productList.sortByNumeric(orderBy, 0);
            this.setState({ productList: sortedProductList });
        } else {
            // Sort by name is default
            const sortedByName = this.state.productList.sortByAlphabet(orderBy,0);
            this.setState({ productList: sortedByName });
        }
    }

    render(){
        // Get products in all categories
        let productList = this.state.productList;
        if (productList.length > 0) {
            return(
                <div>
                    <div className="row justify-content-end sort-box">
                        <select onChange={e => this.handleSort(e)}>
                            <option value="0">--- Sort by ---</option>
                            <option value="1">Price</option>
                            <option value="2">Stock status</option>
                        </select>
                    </div>
                    <div className="row justify-content-center">
                        { productList.map((item, index) => 
                            <div key={index.toString()}
                                className="box box-shadow product-item">
                                <div>
                                    <img src={APIConfig.baseURL + '/' + item.image.url}/>
                                </div>
                                <div className="product-title">
                                    <Link to={'/product/' + item._id}>{item.name}</Link>                                
                                </div>
                                <div>
                                    {item.description.limitWords(10)}...
                                </div>
                                <div className="row">
                                    <div className="col product-price">
                                        {item.price} kr
                                    </div>
                                    <div className="col product-instock">
                                        In stock {item.inStock}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <AddToCart product={item}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}
