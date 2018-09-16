import React, { Component } from 'react';
import { APIConfig } from '../config';

export class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            customerReview: {
                productId: '',
                rating: 5,
                name: '',
                email: '',
                content: ''
            },
            message: ''
        };
    }

    async componentDidMount() {
        // Get reviews by productId from API
        const reviewFetchURL = APIConfig.baseURL + '/review?productId=' + this.props.productId;
        const reviewResponse = await fetch(reviewFetchURL);
        await reviewResponse.json()
            .then((collection) => {
                this.setState({ reviews: collection });
            });

        // Assign productId to review form
        const newState = { ...this.state.customerReview, productId: this.props.productId };
        this.setState({ customerReview: newState });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const newState = {...this.state.customerReview, [name]: value };
        this.setState({ customerReview: newState });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const reviewUrl = APIConfig.baseURL + '/review';
        fetch(reviewUrl, {
            method: 'POST',
            body: JSON.stringify(this.state.customerReview),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            console.log('Success!');

            // Using for clearing form and set state to default
            const defaultCustomerReview = {
                ...this.state.customerReview, 
                rating: 5,
                name: '',
                email: '',
                content: ''
            }
            this.setState({ customerReview: defaultCustomerReview });

            // Print out a message
            this.setState({ message: 'Thanks for your review!'});
            setTimeout(() => {
                this.setState({ message: '' });
            }, 2000);
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <div className="box box-default sendReview">
                            <form id="frmSendReview" action="#" className="frm-sendReview">
                                <table>
                                    <thead>
                                        <tr>
                                            <td colSpan="2">
                                                <span className="review-main-title">Your review</span> <span className="review-message">{this.state.message}</span>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Rating</td>
                                            <td>
                                                <span>
                                                    <label>1<input type="radio" name="rating" value="1" onChange={e => this.handleInputChange(e)} /></label>
                                                    <label>2<input type="radio" name="rating" value="2" onChange={e => this.handleInputChange(e)} /></label>
                                                    <label>3<input type="radio" name="rating" value="3" onChange={e => this.handleInputChange(e)} /></label>
                                                    <label>4<input type="radio" name="rating" value="4" onChange={e => this.handleInputChange(e)} /></label>
                                                    <label>5<input type="radio" name="rating" value="5" onChange={e => this.handleInputChange(e)} defaultChecked /></label>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="txtName">Your name</label></td>
                                            <td><input type="text" id="txtName" name="name" className="reviewInput" required
                                                onChange={e => this.handleInputChange(e)}
                                                value={this.state.customerReview.name}
                                            /><span className="required">*</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="txtEmail">E-mail</label></td>
                                            <td><input type="text" id="txtEmail" name="email" className="reviewInput"
                                                onChange={e => this.handleInputChange(e)}
                                                value={this.state.customerReview.email}
                                            /></td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="txtContent">Comment</label></td>
                                            <td><textarea name="txtContent" id="txtContent" name="content" cols="30" rows="10" className="reviewInput" required
                                                onChange={e => this.handleInputChange(e)}
                                                value={this.state.customerReview.content}
                                            ></textarea><span className="required">*</span></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <button type="button" className="btn button_send_review"
                                                    onClick={e => this.handleSubmit(e)}
                                                >Send</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">(<span className="required">*</span>) Required information</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </form>
                        </div>
                        <div>
                            {this.state.reviews.map((item, index) =>
                                <div key={index.toString()} className="review-item">
                                    <div className="review-customer-name">
                                        {item.name}
                                        <img src={"/images/" + item.rating + "stars.png"} className="review-stars" />
                                    </div>
                                    <div>
                                        {item.content}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}