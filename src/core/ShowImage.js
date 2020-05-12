import React from 'react';
import { API } from '../config';

export  const ShowImage = ({ item, url }) => (
    <div className='product-img'>
        <img src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className='mb-3'
            style={{ maxHeight: '300', maxWidth: '300px' }}></img>
    </div>
);

export  const ShowLogo = ({ item, url }) => (
    <div className='logo-img'>
        <img src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className='mb-3'
            style={{ maxHeight: '100px', maxWidth: '100px' }}></img>
    </div>
);

//
	//	<img src="image.png" style="max-width:600px;width:100%">