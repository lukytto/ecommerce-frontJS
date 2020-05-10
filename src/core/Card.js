import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({ product, showViewProductButton = true, showExpandedInfo = false }) => {

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
                </Link>
            )
        );
    };

    const showAddToCartButton = () => {
        return (
            <button className='btn btn-outline-warning mt-2 mb-2'>
                Add to cart
            </button>
        );
    };

    const showStock = (quantity) => {
        return quantity > 0 ?
            <span className='badge badge-primary badge-pill' >In Stock</span>
            :
            <span className='badge badge-primary badge-pill' >Out of Stock</span>;
    };
	//padaryk, kad rodytu tik tada parametrus, kai jie nera null
	const showDetailedInfo = showExpandedInfo => {
        return (
            showExpandedInfo && (
			<div >
                <p className='black-8' id='subcategory'>
                    Sub Category: {product.sub_category
                        && product.sub_category.name}</p>
                <p className='black-7'>
                    Type: {product.sub_sub_category
                        && product.sub_sub_category.name}</p>
						
                <p className='black-6'>
					Quantity {product.quantity}</p>
            </div>
            )
        );
    };
		
	const hideNullFields = () => {
			//alert(product.sub_category);
		if(product.category == null)
		{
			//alert("category is null");
		}
		if(product.sub_category != null)
		{
			//alert(product.sub_sub_category.name + " " + product.category.name);
		}
	}

    return (

        <div className='card'>
            <div className='card-header name'>{product.name}</div>
            <div className='card-body'>
                <ShowImage item={product} url='product' />
                <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
                <p className='black-10'>€{product.price}</p>
                <p className='black-9'>
                    Category: {product.category
                        && product.category.name}</p>
				{showDetailedInfo(showExpandedInfo)}
				{hideNullFields()}
				
                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showAddToCartButton()}


            </div>

        </div>

    );
};

export default Card;