import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
//import { Link } from 'react-router-dom';
import { createProduct, getCategories, getSub_categories, getSub_sub_categories, getSuppliers } from './apiAdmin';

const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        sub_categories: [],
        sub_category: '',
        sub_sub_categories: [],
        sub_sub_category: '',
        suppliers: [],
        supplier: '',
		"parameters.thickness": '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createProduct: '',
        //redirectToProfile: false,
        formData: ''

    });

    const { user, token } = isAuthenticated();
	const thickness = values["parameters.thickness"];

    const {
        name,
        description,
        price,
        categories,
        //category,
        sub_categories,
        //sub_category,
        sub_sub_categories,
        //sub_sub_category,
        suppliers,
        //supplier,
        //shipping,
        quantity,
        loading,
        error,
        createdProduct,
        //redirectToProfile,
        formData
    } = values;
	
	/*
	function Example({ someProp }) {
		function doSomething() {
			console.log(someProp);  }

		useEffect(() => {
			doSomething();
		}, []); // REEED This is not safe (it calls `doSomething` which uses `someProp`)}
	}
	/////////////
	
	function Example({ someProp }) {
		useEffect(() => {
			function doSomething() {
				console.log(someProp);    }

		doSomething();
		}, [someProp]); // ✅ OK (our effect only uses `someProp`)}
	}
  //////////////////
  */
  
    const init = () => {
		
		let sub_categories;
		let sub_sub_categories;
		let suppliers;
		getCategories().then(data => {
            if (data.error) {
				setValues({...values,error: data.error, formData: new FormData()  });
            } else {
                setValues({...values, categories: data, sub_categories: sub_categories, sub_sub_categories: sub_sub_categories, suppliers: suppliers, formData: new FormData() });
            }
        })
		.then(getSub_categories().then(data => {
            if (data.error) {
                setValues({...values,error: data.error, formData: new FormData()  });
            } else {
				setValues({formData: new FormData()});
				sub_categories = data;
            }
        }))
		.then(getSub_sub_categories().then(data => {
            if (data.error) {
                setValues({...values,error: data.error, formData: new FormData()  });
            } else {
				setValues({formData: new FormData()});
				sub_sub_categories = data;
            }
        }))
		.then(getSuppliers().then(data => {
            if (data.error) {
                setValues({...values,error: data.error, formData: new FormData()  });
            } else {
				setValues({formData: new FormData()});
				suppliers = data;
            }
        }));
		
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className='form-group'>
                <label className='btn btn-secondary'>
                    <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*'></input>
                </label>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input onChange={handleChange('name')} type='text' className='form-control' value={name}></input>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Description</label>
                <textarea onChange={handleChange('description')} className='form-control' value={description}></textarea>
            </div>

            <div id = 'price' className='form-group'>
                <label className='text-muted'>Price</label>
                <input onChange={handleChange('price')} type='number' className='form-control' value={price}></input>
            </div>
			
            <div className='form-group'>
                <label className='text-muted'>Thickness</label>
                <input onChange={handleChange('parameters.thickness')} type='number' className='form-control' value={thickness}></input>
            </div>
			
            <div className='form-group'>
                <label className='text-muted'>Category</label>
                <select onChange={handleChange('category')}
                    className='form-control' >
                    <option>Please select</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
			
            <div className='form-group'>
                <label className='text-muted'>Sub_category</label>
                <select onChange={handleChange('sub_category')}
                    className='form-control' >
                    <option>Please select</option>
                    {sub_categories && sub_categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
			
            <div className='form-group'>
                <label className='text-muted'>Sub_sub_category</label>
                <select onChange={handleChange('sub_sub_category')}
                    className='form-control' >
                    <option>Please select</option>
                    {sub_sub_categories && sub_sub_categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
			
            <div className='form-group'>
                <label className='text-muted'>Supplier</label>
                <select onChange={handleChange('supplier')}
                    className='form-control' >
                    <option>Please select</option>
                    {suppliers && suppliers.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Shipping</label>
                <select onChange={handleChange('shipping')}
                    className='form-control' >
                    <option>Please select</option>
                    <option value='0'>No</option>
                    <option value='1'>Yes</option>
                </select>
            </div>
			
            <div className='form-group'>
                <label className='text-muted'>Quantity</label>
                <input onChange={handleChange('quantity')} type='number' className='form-control' value={quantity}></input>
            </div>

            <button className='btn btn-outline-primary'>
                Create Product
            </button>
        </form>
    );
	
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created</h2>
        </div>
    );

    const showLoading = () => (
        loading && (
            <div className='alert alert-success'>
                <h2>Loading...</h2>
            </div>)
    );

    return (
        <Layout title='Add a new product'
            description={`Hi ${user.name}!, ready to add a new product?`}>
            <div id= 'test' className='row'>
                <div className='col-md-8 offset-md-2'>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>



        </Layout>
    );
};

export default AddProduct;