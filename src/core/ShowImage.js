import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => (
    <div className='product-img'>
		<a href={`/product/${item._id}`}>
			<img src={`${API}/${url}/photo/${item._id}`}
				alt={item.name}
				className='mb-3'
				style={{ maxHeight: '100%', maxWidth: '100%' }}>
			</img>
		</a>
    </div>
);

export default ShowImage;
