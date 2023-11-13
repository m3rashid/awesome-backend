import autoprefixer from 'autoprefixer';
import postcssViewportHeightCorrection from 'postcss-viewport-height-correction';
import tailwindcss from 'tailwindcss';

export default {
	plugins: [tailwindcss, autoprefixer, postcssViewportHeightCorrection],
};
