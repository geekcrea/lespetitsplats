/** @type {import('tailwindcss').Config} */
export const content = [
    './index.html',
    './scripts/*/*.js',
];
export const theme = {
    extend: {
        boxShadow: {
            article: '0 4px 34px 10px rgba(0, 0, 0, 0.2)',
        },
        height: {
            600: '663px',
        },
        colors: {
            yellow: '#FFD15B',
        },
        fontFamily: {
            anton: ['Anton', 'sans-serif'],
        }
    },
};
export const plugins = [];
