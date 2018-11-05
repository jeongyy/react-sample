import React, {Component} from "react";
import {API} from "aws-amplify";
import {PageHeader, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Home.css";

export default class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            categories: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const categories = await this.category();
            this.setState({categories: categories});
        } catch (e) {
            alert(e);
        }

        this.setState({isLoading: false});
    }

    category() {
        return API.get("product", "/category/list");
    }

    renderCategoryList(categories) {
        return [{}].concat(categories).map(
            (category, i) =>
                i !== 0
                    ? <ListGroupItem
                        key={category.categoryCode}
                        href={`/category/list/${category.categoryCode}`}
                        onClick={this.handleCategoryClick}
                        header={category.categoryName.trim().split("\n")[0]}
                    >
                    </ListGroupItem>
                    : ""
        );
    }

    handleCategoryClick = event => {
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

    renderCategories() {
        return (
            <div className="notes">
                <PageHeader>Top Level Category</PageHeader>
                <ListGroup>
                    {!this.state.isLoading && this.renderCategoryList(this.state.categories)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderCategories() : this.renderLander()}
            </div>
        );
    }
}
