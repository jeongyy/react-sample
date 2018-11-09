import React, {Component} from "react";
import {API} from "aws-amplify";
import {PageHeader, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            products: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const products = await this.product();
            this.setState({products: products});
        } catch (e) {
            alert(e);
        }

        this.setState({isLoading: false});
    }

    product() {
        return API.get("product", "/products");
    }

    renderNotesList(products) {
        return [{}].concat(products).map(
            (product, i) =>
                i !== 0
                    ? <ListGroupItem
                        key={product.productId}
                        href={`/products/${product.productId}`}
                        onClick={this.handleProductClick}
                        //header={product.productName.trim().split("\n")[0]}
                        header={product.productName}
                    >
                        Price: {new Intl.NumberFormat("en-US").format(product.productPrice)}원<br/>
                        Maker: {product.productMaker}<br/>
                        {"등록일: " + new Date(product.productRegDt).toLocaleString()}
                    </ListGroupItem>
                    : <ListGroupItem
                        key="new"
                        href="/products/new"
                        onClick={this.handleProductClick}
                    >
                        <h4>
                            <b>{"\uFF0B"}</b> Product Register
                        </h4>
                    </ListGroupItem>
        );
    }

    handleProductClick = event => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute("href"));
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>Womanstalk API</h1>
                <p>A simple product taking app</p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-success btn-lg">
                        Signup
                    </Link>
                </div>
            </div>
        );
    }

    renderProducts() {
        return (
            <div className="notes">
                <PageHeader>Products List</PageHeader>
                <ListGroup>
                    {!this.state.isLoading && this.renderNotesList(this.state.products)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderProducts() : this.renderLander()}
            </div>
        );
    }
}
