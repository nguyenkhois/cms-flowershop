import React, { Component } from 'react';
import { connect } from 'react-redux';

import { cartActions } from '../actions/cart.action';

const mapDispatchToProps = {
    addToCart: cartActions.addToCart,
    updateQuantity: cartActions.updateQuantity
}

const mapStateToProps = (state) => {
    return ({
        cart: state.cart
    })
}

class AddToCartClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            message: {
                content: '',
                style: ''
            }
        };
    }

    handleOnChange = (e) => {
        this.setState({ quantity: parseInt(e.target.value) });
    }

    handleClick = (e) => {
        e.preventDefault();

        // Create a new cart item object
        const cartItem = {
            productId: this.props.product._id,
            productInfo: this.props.product,
            quantity: this.state.quantity
        };

        // Check if
        //  - Item is found in cart - Redux state
        //  - The new cart item quantity <= In stock
        const inStock = this.props.product.inStock;
        const foundItemIndex = this.props.cart.findIndexByProperty('productId', this.props.product._id);
        let updatedSuccess = 0;

        if (foundItemIndex < 0) {
            // Find not found -> Add new
            if (cartItem.quantity <= inStock) {
                this.props.addToCart(cartItem);
                updatedSuccess = 1;
            } else {
                updatedSuccess = -1;
            }
        } else {
            // It It found -> Update only quantity by productId
            const foundItemQuantity = this.props.cart[foundItemIndex].quantity
            if ((cartItem.quantity + foundItemQuantity) <= inStock) {
                this.props.updateQuantity({
                    productId: this.props.product._id,
                    quantity: this.state.quantity
                });
                updatedSuccess = 1;
            } else {
                updatedSuccess = -1;
            }
        }

        // Control message from local state
        let messageObj = { content: '', style: '' };
        switch (updatedSuccess) {
            case 1:
                messageObj = { ...messageObj, content: 'Added to cart', style: 'message-success' }
                break;
            case -1:
                messageObj = { ...messageObj, content: 'Out of stock', style: 'message-unsuccess' }
                break;
            default:
                break;
        }

        this.printOutMessage(messageObj);
    }

    printOutMessage = (messageObj) => {
        this.setState({ message: messageObj });
        setTimeout(() => {
            this.setState({
                message: {
                    ...this.state.message,
                    content: '',
                    style: ''
                }
            });
        }, 500);
    }

    render() {
        return (
            <div className="col p-3">
                <div>
                    <form>
                        <input name="quantity" type="number" min="1" max="50" defaultValue="1"
                            onChange={e => this.handleOnChange(e)}
                        /> {' - '}

                        <button type="button" className="btn btn-success"
                            onClick={e => this.handleClick(e)}>
                            Add to cart
                        </button>
                    </form>
                </div>
                <div className={this.state.message.style + ' message-area'}>
                    {this.state.message.content}
                </div>
            </div>
        )
    }
}

export const AddToCart = connect(mapStateToProps, mapDispatchToProps)(AddToCartClass);