import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../lib'; // For using String.prototype and Array.prototype

import { APIConfig } from '../config';
import { productActions } from '../actions/product.action';

const mapDispatchToProps = {
    storeProducts: productActions.storeProducts
}

export class MenuClass extends Component {
    handleClick = async (categoryId) => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Fetch data by categoryId and store in Redux state
        const productFetchURL = APIConfig.baseURL + '/product?_sort=name:asc&categoryId=' + categoryId;
        const productResponse = await fetch(productFetchURL, {signal});
        await productResponse.json()
                .then((collection)=>{
                    controller.abort();
                    this.props.storeProducts(collection);                    
                });
    }

    render(){
        return(
            <div className="row">
                {this.props.categoryList.map((item, index) =>
                    <div key={index.toString()}
                        className="left-menu">
                        <Link to={'/list/' + item._id} onClick={()=>this.handleClick(item._id)}>{item.name}</Link>
                    </div>
                )}
            </div>
        )
    }
}
export const Menu = connect(null, mapDispatchToProps)(MenuClass);