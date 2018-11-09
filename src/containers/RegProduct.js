import React, {Component} from "react";
import {FormGroup, FormControl, ControlLabel, HelpBlock} from "react-bootstrap";
import {API} from "aws-amplify";
import {s3Upload} from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";

export default class RegProduct extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            productName: "",
            productCategory: "",
            productCategoryCode: "",
            productMaker: "",
            productBrand: "",
            productModel: "",
            productOrigin: "",
            productOption: [],
            productPrice: "",
            productDescription: "",
            productImgUrl: ""
        };
    }

    validateForm() {
        return this.state.productName.length > 0;
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

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
            return;
        }

        this.setState({isLoading: true});

        try {
            const productImg = this.file ? await s3Upload(this.file) : null;

            await this.registProduct({
                productImg,
                productName: this.state.productName,
                productMaker: this.state.productMaker ? this.state.productMaker : null,
                productModel: this.state.productModel ? this.state.productModel : null,
                productOrigin: this.state.productOrigin ? this.state.productOrigin : null,
                productOption: this.state.productOption ? this.state.productOption : null,
                productPrice: this.state.productPrice ? this.state.productPrice : null
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    }

    registProduct(product) {
        return API.post("product", "/products", {
            body: product
        });
    }

    render() {
        return (
            <div className="NewNote">
                <form onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id="productName"
                        type="text"
                        label="Product Name"
                        placeholder="Product Name"
                        onChange={this.handleChange}
                        value={this.state.productName}
                    />
                    <FieldGroup
                        id="productCategory"
                        type="text"
                        label="Category Info"
                        placeholder="Category Name"
                        onChange={this.handleChange}
                        value={this.state.productCategory}
                    />
                    <FormGroup controlId="productCategoryCode">
                        <FormControl
                            type="text"
                            placeholder="Category Code"
                            onChange={this.handleChange}
                            value={this.state.productCategoryCode}
                        />
                    </FormGroup>
                    <FieldGroup
                        id="productMaker"
                        type="text"
                        label="Basic Infomation"
                        placeholder="Maker"
                        onChange={this.handleChange}
                        value={this.state.productMaker}
                    />
                    <FormGroup controlId="productBrand">
                        <FormControl
                            type="text"
                            placeholder="Brand"
                            onChange={this.handleChange}
                            value={this.state.productBrand}
                        />
                    </FormGroup>
                    <FormGroup controlId="productModel">
                        <FormControl
                            type="text"
                            placeholder="Model"
                            onChange={this.handleChange}
                            value={this.state.productModel}
                        />
                    </FormGroup>
                    <FormGroup controlId="productOrigin">
                        <FormControl
                            type="text"
                            placeholder="제조국,원산지"
                            onChange={this.handleChange}
                            value={this.state.productOrigin}
                        />
                    </FormGroup>
                    <FieldGroup
                        id="productPrice"
                        type="text"
                        label="Product Price"
                        placeholder="Product Price"
                        onChange={this.handleChange}
                        value={this.state.productPrice}
                    />
                    <FormGroup controlId="productOption">
                        <ControlLabel>Product Option</ControlLabel>
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.productOption}
                            componentClass="textarea"
                            placeholder="Option"
                        />
                    </FormGroup>
                    <FormGroup controlId="productDescription">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.productDescription}
                            componentClass="textarea"
                            placeholder="Option"
                        />
                    </FormGroup>
                    <FieldGroup
                        id="productImg"
                        type="file"
                        label="Product Image"
                        help="Product Image here."
                        onChange={this.handleFileChange}
                    />
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Registration"
                        loadingText="Uploading…"
                    />
                </form>
            </div>
        );
    };
}

function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
