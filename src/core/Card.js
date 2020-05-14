import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { API } from '../config';


const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    showExpandedInfo = false,
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
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
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
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };
	
	
	const showSubstrate = () => {
		if(product.parameters.substrate != null) {
			return (
				<tr className='' id={product + 'parameters.substrate'}>
					<td className=''>Substrate</td>
					<td className=''>{product.parameters.substrate}</td>
				</tr>
			)
		}
	}
	
	const showArCoating = () => {
		if(product.parameters.ar_coating_type != null) {
			return (
				<tr className='' id={product + 'parameters.ar_coating_type'}>
					<td className=''>Ar Coating</td>
					<td className=''>{product.parameters.ar_coating_type} ({product.parameters.ar_coating_min_thickness} - {product.parameters.ar_coating_max_thickness} nm) </td>
				</tr>
			)
		}
	}
	
	const showSurfaceQualiy = () => {
		if(product.parameters.surface_quality != null) {
			return (
				<tr className='' id={product + 'parameters.surface_quality'}>
					<td className=''>Surface Quality</td>
					<td className=''>{product.parameters.surface_quality}</td>
				</tr>
			)
		}
	}
	
	const showReflectance = () => {
		if(product.parameters.reflectance != null) {
			return (
				<tr className='' id={product + 'parameters.reflectance'}>
					<td className=''>Reflectance</td>
					<td className=''> R&lt; {product.parameters.reflectance}% ({product.parameters.reflectance_max_range} - {product.parameters.reflectance_min_range} nm)</td>
				</tr>	
			)
		}
	}
	
	const showClearAperture = () => {
		if(product.parameters.clear_aperture != null) {
			return (
				<tr className='' id={product + 'parameters.clear_aperture'}>
					<td className=''>Clear Aperture</td>
					<td className=''>{product.parameters.clear_aperture}%</td>
				</tr>
			)
		}
	}
	
	const showSurfaceFlatness = () => {
		if(product.parameters.surface_flatness != null) {
			return (
				<tr className='' id={product + 'parameters.surface_flatness'}>
					<td className=''>Surface Flatness</td>
					<td className=''>&#x03bb;/{product.parameters.surface_flatness}</td>
				</tr>
			)
		}
	}
	
	const showWedgeAngle = () => {
		if(product.parameters.wedge_angle != null) {
			return (
				<tr className='' id={product + 'parameters.wedge_angle'}>
					<td className=''>Wedge Angle</td>
					<td className=''>{product.parameters.wedge_angle}</td>
				</tr>
			)
		}
	}
	
	const showParallelism = () => {
		if(product.parameters.parallelism != null) {
			return (
				<tr className='' id={product + 'parameters.parallelism'}>
					<td className=''>Parallelism</td>
					<td className=''>&#x2264;{product.parameters.parallelism}'</td>
				</tr>
			)
		}
	}
	
	const showShape = () => {
		if(product.parameters.shape != null) {
			return (
				<tr className='' id={product + 'parameters.shape'}>
					<td className=''>Shape</td>
					<td className=''>{product.parameters.shape}</td>
				</tr>
			)
		}
	}
	
	const showThickness = () => {
		if(product.parameters.thickness != null) {
			return (
				<tr className='' id={product + 'parameters.thickness'}>
					<td className=''>Thickess</td>
					<td className=''>{product.parameters.thickness}mm</td>
				</tr>
			)
		}
	}

	const showSurfaceArea = () => {
		if(product.parameters.surface_area != null) {
			return (
				<tr className='' id={product + 'parameters.surface_area'}>
					<td className=''>Surface Area</td>
					<td className=''>{product.parameters.surface_area}mm^2</td>
				</tr>
			)
		}
	}
	
	const showDiameter = () => {
		if(product.parameters.diameter != null) {
			return (
				<tr className='' id={product + 'parameters.diameter'}>
					<td className=''>Dimensions</td>
					<td className=''>&#x2300; {product.parameters.diameter}mm</td>
				</tr>
			)
		}
	}
	
	const showLenght = () => {
		if(product.parameters.length != null) {
			return (
				<tr className='' id={product + 'parameters.length'}>
					<td className=''>Dimensions</td>
					<td className=''>{product.parameters.length} x {product.parameters.width}mm</td>
				</tr>
			)
		}
	}
	
	const showDetailedInfo = showExpandedInfo => {
		if(showExpandedInfo){
			return (
				<div>
					<p className='card-p mt-2' id={product + 'description'}>{product.description.substring(0, 100)}</p>
				
					<table className="table table-hover table-striped table-bordered" id={product + 'largetable'}>
						<caption>Parameters</caption>
						<tbody>
						<tr className='' id={product._id + 'price'}>
							<td className='' >Price</td>
							<td className=''>€{product.price}</td>
						</tr>
						<tr className='' id={product + 'supplier'}>
							<td className=''>Supplier</td>
							<td className=''>{product.supplier && product.supplier.name}</td>
						</tr>
						<tr className='' id={product + 'category'}>
							<td className=''>Category</td>
							<td className=''>{product.category && product.category.name}</td>
						</tr>
					
						<tr className='' id={product + 'sub_category'}>
							<td className=''>Subcategory</td>
							<td className=''>{product.sub_category && product.sub_category.name}</td>
						</tr>
						<tr className='' id={product + 'sub_sub_category'}>
							<td className=''>Type</td>
							<td className=''>{product.sub_sub_category && product.sub_sub_category.name}</td>
						</tr>
						<tr className='' id={product + 'quantity'}>
							<td className='' >Quantity</td>
							<td className=''>{product.quantity}</td>
						</tr>
						
						{showSubstrate()}
						{showArCoating()}
						{showSurfaceQualiy()}
						{showReflectance()}
						{showClearAperture()}
						{showSurfaceFlatness()}
						{showWedgeAngle()}
						{showParallelism()}
						{showShape()}
						{showThickness()}
						{showSurfaceArea()}
						{showDiameter()}
						{showLenght()}


						</tbody>
					</table>
				</div>
            );
		} else {
			return (	
				<div>
					<table className="table table-active table-hover table-bordered" id={product + 'smalltable'}>
						<tr className='' id={product + 'price'}>
							<td className=''>€{product.price}</td>
							<td className=''>{product.sub_sub_category && product.sub_sub_category.name}</td>
						</tr>
					</table> 
				</div>
            );
		}
		
    };

    return (
        <div className="card" >
            <div className="card-header card-header-1 ">
				{product.name}			
				<img src={`${API}/${'supplier'}/photo/${product.supplier._id}`}
				alt={product.supplier.name}
				className='float-right mb-3'
				style={{ maxHeight:75, maxWidth:100}}>
				</img>
			</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
				{showDetailedInfo(showExpandedInfo)}
                {showStock(product.quantity)}
                <br />
                {/* {showDetailedInfo(showExpandedInfo)}
                {hideNullFields()} */}

                {showViewButton(showViewProductButton)}

                {showAddToCartBtn(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Card;