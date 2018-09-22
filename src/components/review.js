import React, { Component } from 'react';

import { APIConfig } from '../config';

export class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        };
    }

    async componentDidMount() {
        const controller = new AbortController();
        const signal = controller.signal;

        // Get reviews by productId from API
        const reviewFetchURL = APIConfig.baseURL + '/review?productId=' + this.props.productId;
        const reviewResponse = await fetch(reviewFetchURL, {signal});
        await reviewResponse.json()
            .then((collection) => {
                controller.abort();
                this.setState({ reviews: collection });
            });

        // Assign productId to review form
        const newState = { ...this.state.customerReview, productId: this.props.productId };
        this.setState({ customerReview: newState });
    }

    render() {
        if (this.state.reviews.length > 0){
            return (
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
            )
        } else {
            return null
        }
    }
}