import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
    render(){
        return(
            <div className="row">
                <div className="col">
                    <img src="/images/logo.png"/>
                </div>
                <div className="col align-self-end">
                    <div className="row justify-content-end">
                        <span>
                            <Link to="/">Home</Link> | <Link to="/cart">Shopping cart</Link> | <Link to="/about">About</Link>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
