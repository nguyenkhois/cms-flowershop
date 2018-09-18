import React, { Component } from 'react';
import { connect } from 'react-redux';

import { APIConfig } from '../config';
import { validateEmailAddress, forceKeyPressNumber } from '../lib';

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
            message: {
                content: '',
                style: ''
            }
        };

        this.txtName = React.createRef();
    }
    
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        const newState = {...this.state.customerInfo, [name]: value };
        this.setState({ customerInfo: newState });
    }

    handleSubmit = () => {
        /* Validation data before process by method handleValidation()
           It returns true or false */
        if (this.handleValidation()){
            // Get the order sum from the shopping cart
            let sum = 0;
            if (this.props.cart.length > 0){
                this.props.cart.map((item) =>
                    sum += item.quantity * item.productInfo.price
                );
            }

            // Create an order with customer info, shopping cart and sum
            const orderInfo = {
                customerInfo: this.state.customerInfo,
                orderedProducts: this.props.cart,
                sum: sum
            };

            // Send the order to API and it store this order in database
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

                // Update inStock quantity in database
                this.props.cart.map((item) => {
                    this.updateStock(item.productId, item.quantity)
                });

                // Clear cart in Redux state
                this.props.clearCart();

                // Print out a message
                this.printOutMessage({ content: 'Thanks for your order!', style: 'message-success' });
            })
            .catch(error => {
                console.error('Error:', error);
                this.printOutMessage({ content: 'We are so sorry! Your order can not processed.', style: 'message-unsuccess' });
            })
        } else {
            this.printOutMessage({ content: 'Your information is invalid', style: 'message-unsuccess' });
            this.txtName.current.focus();
        }
    }

    async updateStock(productId, orderQuantity){
        // Get the current inStock quantity
        const productFetchURL = APIConfig.baseURL + '/product?_id=' + productId;
        const productResponse = await fetch(productFetchURL);
        await productResponse.json()
            .then((collection)=>{
                const inStock = collection[0].inStock;
                
                // Check again inStock before update the quantity in database
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

    handleValidation(){
        let validation = false;

        if (this.state.customerInfo.name.length > 0 && 
            this.state.customerInfo.email.length > 0 &&
            validateEmailAddress(this.state.customerInfo.email) &&
            this.state.customerInfo.phone.length > 0 &&
            this.state.customerInfo.address.length > 0
            ) {
            validation = true;
        }

        return validation
    }

    printOutMessage(messageObj){
        this.setState({ message: messageObj });
        setTimeout(() => {
            this.setState({
                message: { 
                    ...this.state.message, 
                    content: '', 
                    style: '' 
                }
            });
        }, 1000);
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
                                            <span className="common-main-title">Order information</span> <span className={this.state.message.style}>{this.state.message.content}</span>
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
                                                ref={this.txtName}
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
                                                placeholder="your-email@domain.com"
                                                onChange={e=>this.handleInputChange(e)}
                                                value={this.state.customerInfo.email}
                                                ref={this.txtEmail}
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
                                                onKeyPress={(e)=>forceKeyPressNumber(e)}
                                                value={this.state.customerInfo.phone}
                                                ref={this.txtPhone}
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
                                                ref={this.txtAddress}
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