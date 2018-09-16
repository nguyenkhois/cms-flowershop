import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../lib'; // For using own String.prototype

import { productActions } from '../actions/product.action';

const mapDispatchToProps = {
    storeProducts: productActions.storeProducts
}

const mapStateToProps = (state) => {
    return ({
        productList: state.product.productList
    })
}

class SortBoxClass extends Component {
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
            const sortedProductList = this.props.productList.sortByNumeric(orderBy, 0);
            this.props.storeProducts([]); // Force React change state
            this.props.storeProducts(sortedProductList);
        } else {
            // Sort by name is default
            const sortedByName = this.props.productList.sortByAlphabet(orderBy,0);
            this.props.storeProducts([]); // Force React change state
            this.props.storeProducts(sortedByName);
        }
    }
    
    render(){
        return(
            <div>
                <select onChange={e => this.handleSort(e)}>
                    <option value="0">--- Sort by ---</option>
                    <option value="1">Price</option>
                    <option value="2">Stock status</option>
                </select>
            </div>
        )
    }
}

export const SortBox = connect(mapStateToProps, mapDispatchToProps)(SortBoxClass);