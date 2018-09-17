import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIConfig } from '../config';

import { cartActions } from '../actions/cart.action';

const mapDispatchToProps = {
    clearCart: cartActions.clearCart
}

const mapStateToProps = (state) => {
    return ({
        cart: state.cart
    })
}

class OrderClass extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customerInfo: {
                name: '',
                email: '',
                phone: '',
                address: ''
            },
            message: ''
        };
    }
    
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        const newState = {...this.state.customerInfo, [name]: value };
        this.setState({ customerInfo: newState });
        console.log(this.state);
    }

    handleSubmit = () => {
        // Get the order sum
        let sum = 0;
        if (this.props.cart.length > 0){
            this.props.cart.map((item) =>
                sum += item.quantity * item.productInfo.price
            );
        }

        // Create order with customer info, shopping cart and sum
        const orderInfo = {
            customerInfo: this.state.customerInfo,
            orderedProducts: this.props.cart,
            sum: sum
        };

        const orderUrl = APIConfig.baseURL + '/order';
        fetch(orderUrl, {
            method: 'POST',
            body: JSON.stringify(orderInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            console.log('Success!');

            // Clear state
            this.setState({
                customerInfo: {
                    name: '',
                    email: '',
                    phone: '',
                    address: ''
                }
            });

            // Update database
            this.props.cart.map((item) => {
                this.updateStock(item.productId, item.quantity)
            });

            // Clear cart in Redux state
            this.props.clearCart();

            // Print out a message
            this.setState({ message: 'Thanks for your order!'});
            setTimeout(() => {
                this.setState({ message: '' });
            }, 2000);
        })
        .catch(error => console.error('Error:', error))

        // Print out a message
        this.setState({ message: 'Thanks for your order!'});
        setTimeout(() => {
            this.setState({ message: '' });
        }, 2000);
    }

    async updateStock(productId, orderQuantity){
        // Get inStock Quantity
        const productFetchURL = APIConfig.baseURL + '/product?_id=' + productId;
        const productResponse = await fetch(productFetchURL);
        await productResponse.json()
            .then((collection)=>{
                console.log('Found!')
                const inStock = collection[0].inStock;
                
                // Check again inStock before update database
                if (inStock >= orderQuantity){
                    const productUrl = APIConfig.baseURL + '/product/' + productId;
                    fetch(productUrl, {
                        method: 'PUT',
                        body: JSON.stringify({ inStock: (inStock - orderQuantity) }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(() => { console.log('Updated success!')})
                    .catch((e) => { console.log(e) })
                } else {
                    console.log(Error('Can not update database! inStock is less than orderQuantity. Out of stock!'));
                }
            })
            .catch((e) => { console.log(e) });
    }

    render(){
        if (this.props.cart.length > 0){
            return(
                <div>
                    <div className="box box-default common-area">
                        <form action="#" className="common-frm">
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan="2">
                                            <span className="common-main-title">Order information</span> <span className="message-success">{this.state.message}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="txtName">Your name</label>
                                        </td>
                                        <td>
                                            <input name="name" id="txtName" className="common-input" required
                                                onChange={e=>this.handleInputChange(e)}
                                                value={this.state.customerInfo.name}
                                                />
                                            <span className="required">*</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="txtEmail">Email</label>
                                        </td>
                                        <td>
                                            <input name="email" id="txtEmail" className="common-input" required
                                                onChange={e=>this.handleInputChange(e)}
                                                value={this.state.customerInfo.email}
                                                />
                                            <span className="required">*</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="txtPhone">Telephone</label>
                                        </td>
                                        <td>
                                            <input name="phone" id="txtPhone" className="common-input" required
                                                onChange={e=>this.handleInputChange(e)}
                                                value={this.state.customerInfo.phone}
                                                />
                                            <span className="required">*</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="txtAddress">Address</label>
                                        </td>
                                        <td>
                                            <input name="address" id="txtAddress" className="common-input" required
                                                onChange={e=>this.handleInputChange(e)}
                                                value={this.state.customerInfo.address}
                                                />
                                            <span className="required">*</span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button type="button" className="btn button_send_review"
                                                onClick={()=>this.handleSubmit()}
                                                >Order</button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </form>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}

export const Order = connect(mapStateToProps, mapDispatchToProps)(OrderClass);