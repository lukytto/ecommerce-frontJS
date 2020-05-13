import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createSupplier } from './apiAdmin';

const AddSupplier = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        photo: '',
        loading: false,
        error: '',
        createSupplier: '',
        redirectToProfile: false,
        formData: ''

    });

    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        loading,
        error,
        createdSupplier,
        redirectToProfile,
        formData
    } = values;

    const init = () => {
		
		setValues({...values, formData: new FormData()  });
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

        createSupplier(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    loading: false,
                    createdSupplier: data.name
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

            <button className='btn btn-outline-primary'>
                Create Supplier
            </button>
        </form>
    );
	
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: createdSupplier ? '' : 'none' }}>
            <h2>{`${createdSupplier}`} is created</h2>
        </div>
    );

    const showLoading = () => (
        loading && (
            <div className='alert alert-success'>
                <h2>Loading...</h2>
            </div>)
    );


    return (
        <Layout title='Add a new supplier'
            description={`Hi ${user.name}!, ready to add a new supplier?`}>
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

export default AddSupplier;