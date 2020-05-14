import { API } from '../config';

export const createCategory = (userId, token, category) => {
    // console.log(name, email, password);
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createProduct = (userId, token, product) => {
    // console.log(name, email, password);
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createSupplier = (userId, token, supplier) => {
    return fetch(`${API}/supplier/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: supplier
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getCategories = () => {
	//const categories = ["Windows and Wedges","Lenses","Mirrors","Optical Filters","Beamsplitters","Polarizers","Waveplates"];
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


export const getSuppliers = () => {
    return fetch(`${API}/suppliers`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
