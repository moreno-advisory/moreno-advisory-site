import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF2FF",
          100: "#D5DEFC",
          200: "#ADBDF9",
          300: "#7B96F4",
          400: "#4D6DEF",
          500: "#2B4DCA",
          600: "#1E3A9F",
          700: "#162D7A",
          800: "#102260",
          900: "#0D1B4E",
          950: "#070E2B",
        },
        royal: {
          DEFAULT: "#1B3A8C",
          light: "#2462C2",
          dark: "#122868",
        },
        gold: {
          50: "#FEFAEC",
          100: "#FDF3CA",
          200: "#FAE591",
          300: "#F7D153",
          400: "#F5BD28",
          500: "#C9A84C",
          600: "#A8851A",
          700: "#876618",
          800: "#6B4F16",
          900: "#573F15",
          DEFAULT: "#C9A84C",
          light: "#DFB96A",
          bright: "#F0D080",
        },
        brand: {
          navy: "#0D1B40",
          blue: "#1B3A8C",
          "blue-light": "#2462C2",
          gold: "#C9A84C",
          "gold-light": "#DFB96A",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-down": "fadeDown 0.6s ease-out forwards",
        "fade-left": "fadeLeft 0.6s ease-out forwards",
        "fade-right": "fadeRight 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "shimmer": "shimmer 2.5s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(201, 168, 76, 0.6)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-navy": "linear-gradient(135deg, #0D1B40 0%, #1B3A8C 50%, #0D1B40 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)",
        "gradient-hero": "linear-gradient(160deg, #070E2B 0%, #0D1B40 40%, #1B3A8C 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
        "mesh-pattern": "radial-gradient(at 40% 20%, rgba(27,58,140,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(13,27,64,0.4) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(27,58,140,0.2) 0px, transparent 50%)",
      },
      boxShadow: {
        "gold-sm": "0 2px 8px rgba(201, 168, 76, 0.25)",
        "gold": "0 4px 16px rgba(201, 168, 76, 0.35)",
        "gold-lg": "0 8px 32px rgba(201, 168, 76, 0.4)",
        "navy-sm": "0 2px 8px rgba(13, 27, 64, 0.2)",
        "navy": "0 4px 20px rgba(13, 27, 64, 0.3)",
        "navy-lg": "0 12px 40px rgba(13, 27, 64, 0.35)",
        "card": "0 2px 16px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.12), 0 16px 24px rgba(0, 0, 0, 0.06)",
        "glass": "0 4px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      screens: {
        "3xl": "1920px",
      },
      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
