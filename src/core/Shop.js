import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getSub_categories, getSub_sub_categories, getFilteredProducts } from './apiCore';
import CheckBox from './Checkbox';
import { createPriceSlider, createThicknessSlider } from './Sliders';

import noUiSlider from 'nouislider';
import "nouislider/distribute/nouislider.css";
import wNumb from 'wnumb';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], sub_category: [], sub_sub_category: [], price: [], 'parameters.thickness': [] }
    });
    const [categories, setCategories] = useState([]);
    const [sub_categories, setSub_categories] = useState([]);
    const [sub_sub_categories, setSub_sub_categories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(12);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    let priceSlider, thicknessSlider;

    const init = () => {
        ;

        priceSlider = createPriceSlider(document.getElementById('priceSlider'));
        thicknessSlider = createThicknessSlider(document.getElementById('thicknessSlider'));
        priceSlider.noUiSlider.on('change', handlePriceSlider);
        thicknessSlider.noUiSlider.on('change', handleThicknessSlider);

        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
        getSub_categories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSub_categories(data);
            }
        });
        getSub_sub_categories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setSub_sub_categories(data);
            }
        });

    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        //alert(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {

        const newFilters = { ...myFilters }; //nukopijuoju myFilters i newFilters

        newFilters.filters[filterBy] = filters;

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePriceSlider = (values, handle) => {
        if (values != null) {
            values[0] = Number(values[0].replace(/[^0-9.-]+/g, ""));
            values[1] = Number(values[1].replace(/[^0-9.-]+/g, ""));

            let min = priceSlider.noUiSlider.options.range.min;
            let max = priceSlider.noUiSlider.options.range.max;

            if (values[0] == min && values[1] == max) {
                handleFilters([], 'price');
            } else {
                handleFilters(values, 'price');
            }
        }
    };

    const handleThicknessSlider = (values, handle) => {
        if (values != null) {

            values[0] = Number(values[0].replace(/[^0-9.-]+/g, ""));
            values[1] = Number(values[1].replace(/[^0-9.-]+/g, ""));

            let min = thicknessSlider.noUiSlider.options.range.min;
            let max = thicknessSlider.noUiSlider.options.range.max;

            if (values[0] == min && values[1] == max) {
                handleFilters([], 'parameters.thickness');
            } else {
                handleFilters(values, 'parameters.thickness');
            }
        }
    };

	/*
	Kaip padaryti, kad viena checkboxa paspaudus atsidarytu kitas:
	Pirma, reikia nustatyti, kad butent tas checkboxas pakrautas
	Tada padaryti, kad jis revealintu bet koki kita checkboxa
	Tada padaryti, kad reavealintu butent mum reikiama checkboxa
	Padaryti, kad tas checkboxas revealintu kazka kiti ir t.t.
	*/

    return (
        <Layout title='Shop Page'
            description='Search and find optical components of your choice'
            className='container-fluid'>

            <div className='row'>
                <div className='col-2'>

                    <div >
                        <h4>Filter by price</h4>
                        <br />
                        <div id="priceSlider">

                        </div>
                        <br /><br />
                    </div>

                    <div >
                        <h4>Filter by thickness</h4>
                        <br />
                        <div id="thicknessSlider">

                        </div>
                        <br /><br />
                    </div>

                    <div>
                        <h4>Filter by category</h4>
                        <ul>
                            <CheckBox categories={categories}
                                handleFilters={filters =>
                                    handleFilters(filters, 'category')} />
                        </ul>
                    </div>

                    <div>
                        <h4>Filter by subcategory</h4>
                        <ul>
                            <CheckBox categories={sub_categories}
                                handleFilters={filters =>
                                    handleFilters(filters, 'sub_category')} />
                        </ul>
                    </div>

                    <div>
                        <h4>Filter by type</h4>
                        <ul>
                            <CheckBox categories={sub_sub_categories}
                                handleFilters={filters =>
                                    handleFilters(filters, 'sub_sub_category')} />
                        </ul>
                    </div>

                </div>

                <div className='col-10'>
                    <h2 className='mb4'>Products</h2>
                    <div className='row'>

                        {filteredResults.map((product, i) => (

                            <div key={i} className='col-2 mb-2'>
                                <Card product={product} />
                            </div>

                        ))}

                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>

            </div>

        </Layout>);
};

export default Shop;