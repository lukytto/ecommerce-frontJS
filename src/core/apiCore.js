import { API } from '../config';

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=10`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getSub_categories = () => {
	//const categories = ["Windows and Wedges","Lenses","Mirrors","Optical Filters","Beamsplitters","Polarizers","Waveplates"];
	    return fetch(`${API}/sub_categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getSub_sub_categories = () => {
	//const categories = ["Windows and Wedges","Lenses","Mirrors","Optical Filters","Beamsplitters","Polarizers","Waveplates"];
	    return fetch(`${API}/sub_sub_categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {

    const data = {
        limit, skip, filters
    };

    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};