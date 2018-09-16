import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Order } from './order';
import { cartActions } from '../actions/cart.action';

const mapDispatchToProps = {
    removeFromCart: cartActions.removeFromCart
}

const mapStateToProps = (state) => {
    return ({
        cart: state.cart
    })
}

class ShoppingCartClass extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    handleRemove = (productId) => {
        this.props.removeFromCart(productId);
        
    }

    render(){
        let sum = 0;
        if (this.props.cart.length > 0){
            this.props.cart.map((item) =>
                sum += item.quantity * item.productInfo.price
            );
        }

        return(
            <div className="row">
                <div className="cart-message-area">
                    {this.state.message}
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price (kr)</th>
                            <th scope="col">Total</th>
                            <th scope="col">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map((item, index) => 
                        <tr key={index.toString()}>
                            <td>
                                <Link to={'/product/' + item.productId}>{item.productInfo.name}</Link> 
                            </td>
                            <td>{item.quantity}</td>
                            <td>{item.productInfo.price}</td>
                            <td>{Number.parseFloat(item.quantity * item.productInfo.price).toFixed(2)}</td>
                            <td className="icon-delete">
                                <svg onClick={()=>this.handleRemove(item.productId)} 
                                    aria-hidden="true" data-prefix="far" data-icon="trash-alt" 
                                    className="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z"></path>
                                </svg>
                            </td>
                        </tr>                        
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="cart-sum">
                                SUM: {Number.parseFloat(sum).toFixed(2)} kr
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <div>
                    <Order/>
                </div>
            </div>
        )
    }
}

export const ShoppingCart = connect(mapStateToProps, mapDispatchToProps)(ShoppingCartClass);