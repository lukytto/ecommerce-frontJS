import noUiSlider from 'nouislider';
import "nouislider/distribute/nouislider.css";
import wNumb from 'wnumb';

export const createPriceSlider = (slider) => {

	noUiSlider.create(slider, {
	connect: true,
	animate: false,
	tooltips: true,
	//step: 1,
	pips: {
		mode: 'range',
		density: 5,
			format: wNumb({
				decimals: 0,
				prefix: '€'
			})
	},
	start: [0, 1000],
	range: {
		'min': 0,
		'50%': 100,
		'80%': 200,
		'max': 1000
	},
	format: wNumb({
		decimals: 2,
		prefix: '€'
	})
	});
	
	return slider;
}

export const createThicknessSlider = (slider) => {
	
	noUiSlider.create(slider, {
	connect: true,
	animate: false,
	tooltips: true,
	//step: 1,
	pips: {
		mode: 'range',
		density: 5,
			format: wNumb({
				decimals: 0,
				postfix: 'mm'
			})
	},
	start: [0, 100],
	range: {
		'min': 0,
		'max': 100
	},
	format: wNumb({
		decimals: 2,
		postfix: 'mm'
	})
	});
	
	return slider;
}

	