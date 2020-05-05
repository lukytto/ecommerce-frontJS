import React, { useState, useEffect } from 'react';


export const CategoryCheckbox = ({ categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        //return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state >push
        //else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
            <input id={"cat" + i} onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type='checkbox' className='form-check-input' />
            <label for={"cat" + i} className='form-check-label'>{c.name}</label>
        </li>
    ));
};

export const SubCategoryCheckbox = ({ sub_categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        //return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state >push
        //else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return sub_categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
            <input id={"subcat" + i}  onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type='checkbox' className='form-check-input' />
            <label for={"subcat" + i} className='form-check-label'>{c.name}</label>
        </li>
    ));
};

export const TypeCheckbox = ({ sub_sub_categories, handleFilters }) => {

    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        //return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state >push
        //else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return sub_sub_categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
            <input id={"subsubcat" + i} onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type='checkbox' className='form-check-input' />
            <label for={"subsubcat" + i} className='form-check-label'>{c.name}</label>
        </li>
    ));
};