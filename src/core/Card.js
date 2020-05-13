import React, { useState } from 'react';
import { API } from '../config';
import { Link, Redirect  } from 'react-router-dom'; //import { Link, Redirect } from 'react-router-dom'; 
import { ShowProductImage, ShowProductLargeImage, ShowLogo} from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
//import moment from 'moment';


const fields = ['category', 'sub_category', 'sub_sub_category', 'quantity', 'price', 'parameters.substrate', 'parameters.ar_coating_type',
'parameters.ar_coating_min_thickness', 'parameters.ar_coating_max_thickness', 'parameters.surface_quality', 'parameters.reflectance', 'parameters.reflectance_min_range',
'parameters.reflectance_max_range', 'parameters.clear_aperture', 'parameters.surface_flatness', 'parameters.wedge_angle', 'parameters.parallelism', 'parameters.shape',
'parameters.thickness', 'parameters.surface_area', 'parameters.diameter', 'parameters.length', 'parameters.width'];

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    showExpandedInfo = false,
    showLargeImage = false,
    setRun = f => f,
    run = undefined
    // changeCartSize
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
                </Link>
            )
        );
    };
    const addToCart = () => {
        // console.log('added');
        addItem(product, setRedirect(true));
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };
	
	const showAddToCartBtn = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button onClick={addToCart} className="float-right btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
                    Add to cart
                </button>
            )
        );
    };
	
    const showStock = quantity => {
        return quantity > 0 ? (
            <span  className="badge badge-primary badge-pill ">Stock: {product.quantity} </span>
        ) : (
                <span className="badge badge-success primary badge-pill">Out of Stock </span>
            );
    };
	
	const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };


    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="float-right btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
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
				<div>
					<p className='card-p  mt-2' id={product + 'description'}>{product.description.substring(0, 100)}</p>
				
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
				</div>
            );
		} else {
			return (	
				<div>
					<table className='table-1' id={product + 'smalltable'}>
						<tr className='tr-1' id={product + 'price'}>
							<td className='td-1'>€{product.price}</td>
							<td className='td-1'>{product.sub_sub_category && product.sub_sub_category.name}</td>
						</tr>
					</table> 
				</div>
            );
		}
		
    };
	
	const showImage = showLargeIamge => {
		if(showLargeImage){
			return(
				<div >
					<div >
						<ShowProductLargeImage item={product} url='product' />
					</div>
				</div>
			)
		} else {
			return(
				<div  className=' bg-primary'>
				
					<a href={`/product/${product._id}`}>
						<img style={{maxWidth: 215, zIndex:1}} className='' src={`${API}/${'product'}/photo/${product._id}`}
						alt={product.name}
						className='mb-3'
						
						></img>
					</a>
				</div>
			)
		}
	}
	/*
	
					<div className='col'>
						<ShowProductImage item={product} url='product' />
					</div>
					<div >
						<ShowLogo item={product.supplier} url='supplier' />
					</div>
					<div className='float-right'>
					<img src={`${API}/${'supplier'}/photo/${product.supplier._id}`}
						alt={product.supplier.name}
						className='mb-3'
						style={{ maxHeight:35, maxWidth:100}}></img>
				</div>
					
	*/
	
    return (

        <div className='card' style={{display:'flex'}} >
            <div className='card-header card-header-1 '>{product.name}
				<ShowLogo item={product.supplier} url='supplier' />
				
				</div>
			{showImage(showLargeImage)}
            <div className='card-body'>
                {shouldRedirect(redirect)}
				<div className="image-stack">
					
					
				</div>
       
               
				{showDetailedInfo(showExpandedInfo)}
				{hideNullFields()}
				
                <br />
				
				

                {showStock(product.quantity)}
                {showAddToCartBtn(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Card;