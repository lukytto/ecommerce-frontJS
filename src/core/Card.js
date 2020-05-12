import React from 'react';
import { Link } from 'react-router-dom'; //import { Link, Redirect } from 'react-router-dom'; 
import { ShowImage, ShowLogo} from './ShowImage';
//import moment from 'moment';

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
					<tr className='tr-1' id={product + 'supplier'}>
						<td className='td-1'>Supplier</td>
						<td className='td-1'>{product.supplier && product.supplier.name}</td>
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
						<td className='td-1'>Ar Coating</td>
						<td className='td-1'>{product.parameters.ar_coating_type} ({product.parameters.ar_coating_min_thickness} - {product.parameters.ar_coating_max_thickness} nm) </td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.surface_quality'}>
						<td className='td-1'>Surface Quality</td>
						<td className='td-1'>{product.parameters.surface_quality}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.reflectance'}>
						<td className='td-1'>Reflectance</td>
						<td className='td-1'> R&lt; {product.parameters.reflectance}% ({product.parameters.reflectance_max_range} - {product.parameters.reflectance_min_range} nm)</td>
					</tr>					
					<tr className='tr-1' id={product + 'parameters.clear_aperture'}>
						<td className='td-1'>Clear Aperture</td>
						<td className='td-1'>{product.parameters.clear_aperture}%</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.surface_flatness'}>
						<td className='td-1'>Surface Flatness</td>
						<td className='td-1'>&#x03bb;/{product.parameters.surface_flatness}</td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.wedge_angle'}>
						<td className='td-1'>Wedge Angle</td>
						<td className='td-1'>{product.parameters.wedge_angle}</td>
					</tr>
					
					<tr className='tr-1' id={product + 'parameters.parallelism'}>
						<td className='td-1'>Parallelism</td>
						<td className='td-1'>&#x2264;{product.parameters.parallelism}'</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.shape'}>
						<td className='td-1'>Shape</td>
						<td className='td-1'>{product.parameters.shape}</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.thickness'}>
						<td className='td-1'>Thickness</td>
						<td className='td-1'>{product.parameters.thickness}mm</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.surface_area'}>
						<td className='td-1'>Surface Area</td>
						<td className='td-1'>{product.parameters.surface_area}mm^2</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.diameter'}>
						<td className='td-1'>Dimensions</td>
						<td className='td-1'>&#x2300; {product.parameters.diameter}mm</td>
					</tr>
					<tr className='tr-1' id={product + 'parameters.length'}>
						<td className='td-1'>Dimensions</td>
						<td className='td-1'>{product.parameters.length} x {product.parameters.width}mm</td>
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

	//         <ShowImage item={product.supplier} url='supplier' />
    return (

        <div className='card' >
            <div className='card-header name'>{product.name}</div>
            <div className='card-body'>
				<div className="image-stack">
					<div className="image-stack__item--bottom">
						<ShowImage item={product} url='product' />
					</div>
					<div className="image-stack__item--top">
						<ShowLogo item={product.supplier} url='supplier' />
					</div>
					
				</div>
       
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