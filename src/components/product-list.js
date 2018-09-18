import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../lib'; // For using own String.prototype

import { APIConfig } from '../config';
import { productActions } from '../actions/product.action';

import { SortBox } from './sort-box';
import { AddToCart } from './add-to-cart';

const mapDispatchToProps = {
    storeProducts: productActions.storeProducts
}

const mapStateToProps = (state) => {
    return ({
        productList: state.product.productList
    })
}

class ProductListClass extends Component {
    constructor(props) {
        super(props);
        this.state = { isMounted: false };
    }

    async componentDidMount() {
        // Fetch only in the first time for direct access by URL
        const controller = new AbortController();
        const signal = controller.signal;

        const categoryId = this.props.match.params.categoryId || '';
        const productFetchURL = APIConfig.baseURL + '/product?_sort=name:asc&categoryId=' + categoryId;
        const productResponse = await fetch(productFetchURL, signal);
        await productResponse.json()
            .then((collection) => {
                controller.abort();
                this.props.storeProducts(collection);
            });
    }

    componentDidMount() {
        this.setState({isMounted: true})
    }
    componentWillUnmount(){
        this.setState({isMounted: false})
    }

    render() {
        /* ----------
        1/  If The user access direct via URL
                Using componentDidMount()
                - Fetch data from API
                - Store data into Redux state
            Else The user access via menu
                - Get data from Redux state
        
        2/  Sort data happen in Redux state - Component <SortBox/>
        3/  OBS! This component get only data from Redux state
        ---------- */

        const productList = this.props.productList;
        if (productList.length > 0) {
            console.log('ProductComp - render');
            return (
                <div>
                    <div className="row justify-content-end">
                        <SortBox />
                    </div>
                    <div className="row justify-content-center">
                        {productList.map((item, index) =>
                            <div key={index.toString()}
                                className="box box-shadow product-item">
                                <div>
                                    <img src={APIConfig.baseURL + '/' + item.image.url} />
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
                                    <div>
                                        <AddToCart product={item} />
                                    </div>
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

export const ProductList = connect(mapStateToProps, mapDispatchToProps)(ProductListClass);