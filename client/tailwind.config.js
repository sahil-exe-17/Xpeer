export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary-container": "#b4b4bd",
        "tertiary-fixed": "#e4e1e5",
        "on-surface-variant": "#c4c7c8",
        "surface-dim": "#131313",
        "on-tertiary": "#303033",
        "secondary-fixed-dim": "#c6c6cf",
        "outline-variant": "#444748",
        "surface-container-lowest": "#0e0e0e",
        "on-tertiary-fixed": "#1b1b1e",
        "tertiary": "#ffffff",
        "on-tertiary-fixed-variant": "#47464a",
        "tertiary-fixed-dim": "#c8c6c9",
        "on-tertiary-container": "#656467",
        "surface": "#131313",
        "secondary-container": "#45464e",
        "error-container": "#93000a",
        "tertiary-container": "#e4e1e5",
        "on-secondary": "#2f3037",
        "on-background": "#e2e2e2",
        "background": "#131313",
        "on-primary-fixed": "#1a1c1c",
        "surface-container-low": "#1b1b1b",
        "surface-container-highest": "#353535",
        "primary-fixed": "#e2e2e2",
        "inverse-primary": "#5d5f5f",
        "on-secondary-fixed": "#1a1b22",
        "on-error": "#690005",
        "surface-container-high": "#2a2a2a",
        "on-primary-container": "#636565",
        "on-primary": "#2f3131",
        "error": "#ffb4ab",
        "primary-fixed-dim": "#c6c6c7",
        "primary": "#ffffff",
        "on-primary-fixed-variant": "#454747",
        "surface-variant": "#353535",
        "primary-container": "#e2e2e2",
        "on-secondary-fixed-variant": "#45464e",
        "outline": "#8e9192",
        "inverse-surface": "#e2e2e2",
        "on-surface": "#e2e2e2",
        "surface-tint": "#c6c6c7",
        "surface-bright": "#393939",
        "secondary-fixed": "#e2e1eb",
        "inverse-on-surface": "#303030",
        "surface-container": "#1f1f1f",
        "secondary": "#c6c6cf",
        "on-error-container": "#ffdad6"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "1.25rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "24px",
        "lg": "48px",
        "container-max": "1200px",
        "xl": "80px",
        "margin-mobile": "16px",
        "md": "24px",
        "xs": "8px",
        "unit": "4px",
        "sm": "16px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "mono-sm": ["Geist", "monospace"],
        "label-md": ["Geist", "sans-serif"],
        "headline-lg-mobile": ["Geist", "sans-serif"],
        "headline-lg": ["Geist", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-md": ["Geist", "sans-serif"],
        "display": ["Geist", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "mono-sm": ["12px", {"lineHeight": "1.4", "fontWeight": "400"}],
        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "headline-lg-mobile": ["24px", {"lineHeight": "1.2", "fontWeight": "600"}],
        "headline-lg": ["32px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "500"}],
        "display": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.04em", "fontWeight": "700"}]
      },
      animation: {
        "shimmer": "shimmer 3s infinite linear",
      },
      keyframes: {
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        }
      }
    }
  },
  plugins: [],
}
