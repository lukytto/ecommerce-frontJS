import React from 'react';
import { API } from '../config';

export  const ShowProductImage = ({ item, url }) => (
    <div  >
	<figure>
		<a href={`/product/${item._id}`}>
        <img className='img-fluid' src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className='mb-3'
            
			></img>
		</a>
	</figure>
    </div>
);
//style={{ maxHeight: '250px', maxWidth: '250px' }}>

export  const ShowProductLargeImage = ({ item, url }) => (
    <div className='product-img'>
		<a href={`/product/${item._id}`}>
			<img src={`${API}/${url}/photo/${item._id}`}
				alt={item.name}
				className='mb-3'
				style={{ maxHeight: '750px', maxWidth: '750px' }}>
			</img>
		</a>
    </div>
);

export  const ShowLogo = ({ item, url }) => (
    <div className='float-right'>
        <img src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className='mb-3'
            style={{ maxHeight:75, maxWidth:100}}></img>
    </div>
);

//
	//	<img src="image.png" style="max-width:600px;width:100%">