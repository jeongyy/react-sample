import React, {Component} from "react";
import {API} from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
//import config from "../config";
import "./Product.css";

export default class Product extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            isDeleting: null,
            product: null,
            productName: "",
            productImg: null,
            consumerPrice: "",
            csp: "",
            productMaker: "",
            productModel: "",
            productQuantity: "",
            productRegDt: ""
        };
    }

    async componentDidMount() {
        try {
            //let attachmentURL;
            const product = await this.getProduct();
            console.log(product);
            const {productName, productImg, productConsumerPrice, csp, productMaker, productModel, productQuantity, productRegDt} = product;

            //if (productImg) {
            //attachmentURL = await Storage.vault.get(productImg);
            //}

            this.setState({
                product,
                productName,
                productImg,
                productConsumerPrice, csp, productMaker, productModel, productQuantity, productRegDt
            });
        } catch (e) {
            alert(e);
        }
    }

    getProduct() {
        return API.get("product", `/products/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.productName.length > 0;
    }

    formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

        /*
        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
            return;
        }

        this.setState({ isLoading: true });
        */
        this.props.history.push("/");
    }

    deleteProduct() {
        return API.del("product", `/products/${this.props.match.params.id}`);
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({isDeleting: true});

        try {
            await this.deleteProduct();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({isDeleting: false});
        }
    }

    render() {
        return (
            <div className="Notes">
                {this.state.product &&
                <div className="Product">
                    CSP: {this.state.csp}<br/><br/>
                    {this.state.productName}<br/>
                    {this.state.productMaker}<br/><br/>
                    가격: {this.state.consumerPrice}<br/>
                    모델: {this.state.productModel}<br/>
                    수량: {this.state.productQuantity}<br/>
                    등록: {this.state.productRegDt}
                    {this.state.product.productImg &&
                    <div>
                        <img width="50%" src={'http://img.womanstalk.co.kr/' + this.state.productImg} alt=""/>
                    </div>
                    }
                </div>
                }
                {this.state.product &&
                <form onSubmit={this.handleSubmit}>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="List"
                        loadingText="Saving…"
                    />
                    <LoaderButton
                        block
                        bsStyle="danger"
                        bsSize="large"
                        isLoading={this.state.isDeleting}
                        onClick={this.handleDelete}
                        text="Delete"
                        loadingText="Deleting…"
                    />
                </form>}
            </div>
        );
    }

}
