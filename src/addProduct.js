import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      isUpdated: false,
    };
  }
  changeUpdateStatus() {
    this.setState({ isUpdated: true });
  }
  componentWillUnmount() {
    this.setState({ isUpdated: false });
  }
  render() {
    const { handleChange, handleSubmit } = this.props;
    if (this.state.isUpdated) {
      return <Redirect to="/" />;
    }
    return (
      <div
        className="container shadow py-4 mt-5"
        style={{ width: "45%", borderRadius: 10 }}
      >
        <h1 className="text-center">Add Product</h1>
        <form className="needs-validation" noValidate>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <div class="valid-feedback">Looks good!</div>
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Price
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputPassword1"
              required
              onChange={(e) => handleChange("price", e.target.value)}
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="mb-3">
            <label for="Image" class="form-label">
              Image Url
            </label>
            <input
              type="text"
              class="form-control"
              id="Image"
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="d-grid gap-2">
            <button
              class="btn btn-primary"
              type="submit"
              onClick={(e) => {
                this.changeUpdateStatus();
                handleSubmit(e);
              }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
