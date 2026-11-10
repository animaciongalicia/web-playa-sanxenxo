import type { Config } from 'tailwindcss';

// Paleta propia de Playa Sanxenxo.
// ria   = azul petróleo de ría (primario): 700 botones y enlaces, 800 bandas, 50-100 fondos claros.
// arena = beige cálido (acento): fondos suaves y detalles. Se usa poco.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ria: {
          50: '#effafd',
          100: '#d6f2f9',
          200: '#b0e5f2',
          300: '#78d0e6',
          400: '#38b4d3',
          500: '#1c98b9',
          600: '#187a9b',
          700: '#176380',
          800: '#195169',
          900: '#1a445a',
          950: '#0b2b3b',
        },
        arena: {
          50: '#fbf8f3',
          100: '#f5eee1',
          200: '#ebdcc1',
          300: '#dec39a',
          400: '#cfa56f',
          500: '#c48d51',
          600: '#b57744',
          700: '#965e39',
          800: '#7a4e34',
          900: '#64422d',
          950: '#362116',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
