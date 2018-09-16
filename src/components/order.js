import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = {
    
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

        };
    }
    
    render(){
        if (this.props.cart.length > 0){
            return(
                <div>
                    Order component
                </div>
            )
        } else {
            return null
        }
        
    }
}

export const Order = connect(mapStateToProps, mapDispatchToProps)(OrderClass);