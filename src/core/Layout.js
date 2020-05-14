import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({
    title = 'Title',
    description = 'Description',
    className,
    children
}) => (
        <div>
            <Menu />
            <div className='jumbotron '>
                <h2>{title}</h2>
                <p className='lead'>{description}</p>
				
				
            </div>
            <div className={className}>{children}</div>
        </div>

    );

export default Layout;

/*
C:\Users\cilia\Desktop\Eptica\FrontEnd\public\epticalogo.jpg

<img src={`${API}/${url}/photo/${item._id}`}
				alt={item.name}
				className='mb-3'
				style={{ maxHeight: '100%', maxWidth: '100%' }}>
			</img>
			*/