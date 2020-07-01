import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import {
  getProduct,
  updateProduct,
  getCategories,
  getSub_categories,
  getSub_sub_categories,
  getSuppliers,
} from "./apiAdmin";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    sub_categories: [],
    sub_category: "",
    sub_sub_categories: [],
    sub_sub_category: "",
    suppliers: [],
    supplier: "",
    "parameters.thickness": "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  //   const thickness = values["parameters.thickness"];
  const [categories, setCategories] = useState([]);
  const [sub_categories, setSub_Categories] = useState([]);
  const [sub_sub_categories, setSub_Sub_Categories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    // categories,
    category,
    // sub_categories,
    sub_category,
    // sub_sub_categories,
    sub_sub_category,
    // suppliers,
    supplier,
    shipping,
    thickness,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          sub_category: data.sub_category._id,
          sub_sub_category: data.sub_sub_category._id,
          supplier: data.supplier._id,
          shipping: data.shipping,
          thickness: data.thickness,
          quantity: data.quantity,
          formData: new FormData(),
        });
        // load categories
        initCategories();
      }
    });
  };

  // load categories and set form data
  const initCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setCategories(data);
        }
      })
      .then(
        getSub_categories().then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setSub_Categories(data);
          }
        })
      )
      .then(
        getSub_sub_categories().then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setSub_Sub_Categories(data);
          }
        })
      )
      .then(
        getSuppliers().then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setSuppliers(data);
          }
        })
      );
  };

  useEffect(() => {
    init(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            error: false,
            redirectToProfile: true,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          ></input>
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        ></textarea>
      </div>

      <div id="price" className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Supplier</label>
        <select onChange={handleChange("supplier")} className="form-control">
          <option>Please select</option>
          {suppliers &&
            suppliers.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Subcategory</label>
        <select
          onChange={handleChange("sub_category")}
          className="form-control"
        >
          <option>Please select</option>
          {sub_categories &&
            sub_categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Type</label>
        <select
          onChange={handleChange("sub_sub_category")}
          className="form-control"
        >
          <option>Please select</option>
          {sub_sub_categories &&
            sub_sub_categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Thickness</label>
        <input
          onChange={handleChange("parameters.thickness")}
          type="number"
          className="form-control"
          value={thickness}
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        ></input>
      </div>

      <button className="btn btn-outline-primary">Update Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is updated!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />;
      }
    }
  };

  //	if(document.getElementById('priceee') != null)

  return (
    <Layout
      title="Update a product"
      description={`Hi ${user.name}!, ready to update a product?`}
    >
      <div id="test" className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
