import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const fields = ['category', 'sub_category', 'sub_sub_category', 'quantity', 'price', 'parameters.substrate', 'parameters.ar_coating_type',
'parameters.ar_coating_min_thickness', 'parameters.ar_coating_max_thickness', 'parameters.surface_quality', 'parameters.reflectance', 'parameters.reflectance_min_range',
'parameters.reflectance_max_range', 'parameters.clear_aperture', 'parameters.surface_flatness', 'parameters.wedge_angle', 'parameters.parallelism', 'parameters.shape',
'parameters.thickness', 'parameters.surface_area', 'parameters.diameter', 'parameters.length', 'parameters.width'];

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
	
	const hideNullFields = () => {
		//
			//	{hideNullFields()}
		fields.forEach(function (item) {
			if (product[item] != null) {
				let elementId = product + item;
				let variable = document.getElementById(elementId);
				if(variable != null) {	
					//variable.style.display = "block";
				}
			}
		})
		
	}
	
	const showDetailedInfo = showExpandedInfo => {
		if(showExpandedInfo){
			return (
				<table className='table-1' id={product + 'smalltable'}>
					<tr className='tr-1' id={product._id + 'price'}>
						<td className='td-1' >Price</td>
						<td className='td-1'>€{product.price}</td>
					</tr>
					<tr className='tr-1' id={product + 'category'}>
						<td className='td-1'>Category</td>
						<td className='td-1'>{product.category && product.category.name}</td>
					</tr>
				
					<tr className='tr-1' id={product + 'sub_category'}>
						<td className='td-1'>Subcategory</td>
						<td className='td-1'>{product.sub_category && product.sub_category.name}</td>
					</tr>
					<tr className='tr-1' id={product + 'sub_sub_category'}>
						<td className='td-1'>Type</td>
						<td className='td-1'>{product.sub_sub_category && product.sub_sub_category.name}</td>
					</tr>
					<tr className='tr-1' id={product + 'quantity'}>
						<td className='td-1' >Quantity</td>
						<td className='td-1'>{product.quantity}</td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.substrate'}>
						<td className='td-1'>Substrate</td>
						<td className='td-1'>{product.parameters.substrate}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.ar_coating_type'}>
						<td className='td-1'>Ar Coating Type</td>
						<td className='td-1'>{product.parameters.ar_coating_type}</td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.ar_coating_min_thickness'}>
						<td className='td-1'>ar_coating_min_thickness</td>
						<td className='td-1'>{product.parameters.ar_coating_min_thickness}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.ar_coating_max_thickness'}>
						<td className='td-1'>ar_coating_min_thickness</td>
						<td className='td-1'>{product.parameters.ar_coating_max_thickness}</td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.surface_quality'}>
						<td className='td-1'>surface_quality</td>
						<td className='td-1'>{product.parameters.surface_quality}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.reflectance'}>
						<td className='td-1'>reflectance</td>
						<td className='td-1'>{product.parameters.reflectance}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.reflectance_min_range'}>
						<td className='td-1'>reflectance_min_range</td>
						<td className='td-1'>{product.parameters.reflectance_min_range}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.reflectance_max_range'}>
						<td className='td-1'>reflectance_max_range</td>
						<td className='td-1'>{product.parameters.reflectance_max_range}</td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.clear_aperture'}>
						<td className='td-1'>clear_aperture</td>
						<td className='td-1'>{product.parameters.clear_aperture}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.surface_flatness'}>
						<td className='td-1'>surface_flatness</td>
						<td className='td-1'>{product.parameters.surface_flatness}</td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.wedge_angle'}>
						<td className='td-1'>wedge_angle</td>
						<td className='td-1'>{product.parameters.wedge_angle}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.reflectance_max_range'}>
						<td className='td-1'>reflectance_max_range</td>
						<td className='td-1'>{product.parameters.reflectance_max_range}</td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.parallelism'}>
						<td className='td-1'>parallelism</td>
						<td className='td-1'>{product.parameters.parallelism}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.shape'}>
						<td className='td-1'>shape</td>
						<td className='td-1'>{product.parameters.shape}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.thickness'}>
						<td className='td-1'>thickness</td>
						<td className='td-1'>{product.parameters.thickness}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.surface_area'}>
						<td className='td-1'>surface_area</td>
						<td className='td-1'>{product.parameters.surface_area}mm^2</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.diameter'}>
						<td className='td-1'>diameter</td>
						<td className='td-1'>{product.parameters.diameter}mm</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.length'}>
						<td className='td-1'>length</td>
						<td className='td-1'>{product.parameters.length}mm</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.width'}>
						<td className='td-1'>width</td>
						<td className='td-1'>{product.parameters.width}mm</td>
					</tr>
				</table> 
            );
		} else {
			return (	
				<table className='table-1' id={product + 'smalltable'}>
					<tr className='tr-1' id={product + 'price'}>
						<td className='td-1' >Price</td>
						<td className='td-1'>€{product.price}</td>
					</tr>
					<tr className='tr-1' id={product + 'category'}>
						<td className='td-1'>Category</td>
						<td className='td-1'>{product.category && product.category.name}</td>
					</tr>
				</table> 
            );
		}
		
    };
	/*
'parameters.ar_coating_min_thickness', 'parameters.ar_coating_max_thickness', 'parameters.surface_quality', 'parameters.reflectance', 'parameters.reflectance_min_range',
'parameters.reflectance_max_range', 'parameters.clear_aperture', 'parameters.surface_flatness', 'parameters.wedge_angle', 'parameters.parallelism', 'parameters.shape',
'parameters.thickness', 'parameters.surface_area', 'parameters.diameter', 'parameters.length', 'parameters.width'];
	const fields = ['category', 'sub_category', 'sub_sub_category', 'quantity', 'price', 


		
			
                <p id='quantity'>
					Quantity {product.quantity}</p>
                <p id='sub_category'>
                    Subcategory: {product.sub_category
                        && product.sub_category.name}</p>
                <p id='sub_sub_category'>
                    Type: {product.sub_sub_category
                        && product.sub_sub_category.name}</p>
                <p id='parameters.substrate'>
					Substrate: {product['parameters.substrate']}</p>
                <p id='parameters.ar_coating_type'>
					Ar Coating Type: {product['parameters.ar_coating_type']}</p>
*/

    return (

        <div className='card'>
            <div className='card-header name'>{product.name}</div>
            <div className='card-body'>
                <ShowImage item={product} url='product' />
                <p className='lead mt-2' id={product + 'description'}>{product.description.substring(0, 100)}</p>

               
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