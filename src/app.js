import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { APIConfig } from './config';

import { Header } from './components/header';
import { Menu } from './components/menu';
import { Home } from './components/home';
import { ProductList } from './components/product-list';
import { ProductDetail } from './components/product';
import { ShoppingCart } from './components/cart';
import { Footer } from './components/footer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        };
    }

    async componentDidMount(){
        const categoryFetchUrl = APIConfig.baseURL + '/category?_sort=name:asc';
        const categoryResponse = await fetch(categoryFetchUrl);
        await categoryResponse.json()
            .then((collection) => {
                this.setState({ categoryList: collection });
            });
    }
    
    render(){
        return(
            <BrowserRouter>
                <div className="container">
                    <header className="row">
                        <div className="col">
                            <Header/>
                        </div>
                    </header>

                    <main className="row">
                        <div className="col-3">
                            <Menu categoryList={this.state.categoryList}/>
                        </div>
                        <div className="col">
                            <Switch>
                                <Route exact path="/" render={() => (
                                    <Home/>
                                )} />
                                <Route path="/list/:categoryId" render={({ match }) => (
                                    <ProductList match={match}/>
                                )} />
                                <Route path="/product/:productId" render={({ match }) => (
                                    <ProductDetail match={match}/>
                                )} />
                                <Route path="/cart" render={() => (
                                    <ShoppingCart/>
                                )} />
                            </Switch>
                        </div>
                    </main>

                    <footer className="row">
                        <div className="col bg-green">
                            <Footer/>
                        </div>
                    </footer>
                </div>            
            </BrowserRouter>
        );
    }
};

export default App;