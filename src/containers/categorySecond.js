import React, {Component} from "react";
import {API} from "aws-amplify";
import {PageHeader, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Home.css";

export default class CategorySecond extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            catCode: "",
            upperCatName: "",
            categories: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const categories = await this.categoryList();
            const categoryInfo = await this.categoryInfo();
            this.setState({catCode: this.props.match.params.code, categories: categories});
            this.setState({upperCatName: categoryInfo.categoryName});
        } catch (e) {
            alert(e);
        }

        this.setState({isLoading: false});
    }

    categoryList() {
        return API.get("product", `/category/list/${this.props.match.params.code}`);
    }

    categoryInfo() {
        return API.get("product", `/category/${this.props.match.params.code}`);
    }

    renderCategoryList(categories) {
        return [{}].concat(categories).map(
            (category, i) =>
                i !== 0
                    ? <ListGroupItem
                        key={category.categoryCode}
                        href={`/category/list/${this.state.catCode}/${category.categoryCode}`}
                        onClick={this.handleCategoryClick}
                        header={category.categoryName.trim().split("\n")[0]}
                    >
                    </ListGroupItem>
                    : <ListGroupItem
                        key={'back'}
                        href={'/category/list'}
                        onClick={this.handleCategoryClick}
                        header={'<'}
                    >
                    </ListGroupItem>
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
                <PageHeader>2nd Level Category</PageHeader>
                <p><a href={'/category/list'}>Home</a> > <a href={`/category/list/${this.state.catCode}`}>{this.state.upperCatName}</a></p>
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
