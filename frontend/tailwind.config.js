/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Earthy tones untuk aflevering.jo
        cream: {
          50: '#fdfbf7',
          100: '#f6f2e8',
          200: '#ede4d1',
          300: '#e1d0b1',
          400: '#d4b891',
          500: '#c8a373',
          600: '#b58d5e',
          700: '#966f47',
          800: '#7a5a3c',
          900: '#654c34',
        },
        brown: {
          50: '#faf8f3',
          100: '#f3ede3',
          200: '#e6d7c3',
          300: '#d4bb9b',
          400: '#c19870',
          500: '#b17d54',
          600: '#a06749',
          700: '#85543e',
          800: '#6d4538',
          900: '#5a3a30',
        },
        sage: {
          50: '#f6f7f4',
          100: '#ebede6',
          200: '#d6dace',
          300: '#bcc4ae',
          400: '#9ea889',
          500: '#839170',
          600: '#6b7659',
          700: '#555e49',
          800: '#464d3d',
          900: '#3a4034',
        }
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(185, 141, 94, 0.1) 0%, rgba(131, 145, 112, 0.1) 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(243, 237, 227, 0.6) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'scale-up': 'scale-up 0.3s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};