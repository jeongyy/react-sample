import React, {Component} from "react";
import {API} from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./NewProduct.css";

export default class NewProduct extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            prodName: ""
        };
    }

    callingApi() {
        return API.get("product", "/api/products");
    }

    handleCallApi = async event => {
        event.preventDefault();

        this.setState({ isLoading: true});

        try {
            await this.callingApi();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <div className="NewNote">
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        isLoading={this.state.isLoading}
                        onClick={this.handleCallApi}
                        text="Call API"
                        loadingText="Calling…"
                    />
            </div>
        );
    }
}
