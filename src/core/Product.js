import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

	/*
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
	*/


const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSigleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                //fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });

    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSigleProduct(productId);
    }, [props]);

    return (
        <Layout title={product && product.name}
            description={product
                && product.description
                && product.description.substring(0, 100)} className='container'>

            <div className='row'>
                <div className='col-8'>
                    {product
                        && product.description &&
                        <Card product={product}
                            showViewProductButton={false} 
							showExpandedInfo={true}/>
                    }
                </div>
                <div className='col-4'>
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className='mb-3'>
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>);
};

export default Product;
