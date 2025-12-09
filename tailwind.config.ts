import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Lexend Deca', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Crimson Pro', 'EB Garamond', 'ui-serif', 'Georgia', 'serif'],
        mono: ['Inconsolata', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        // Bento Grid Colors
        "bento-coral": "hsl(var(--bento-coral))",
        "bento-amber": "hsl(var(--bento-amber))",
        "bento-emerald": "hsl(var(--bento-emerald))",
        "bento-sky": "hsl(var(--bento-sky))",
        "bento-violet": "hsl(var(--bento-violet))",
        "bento-rose": "hsl(var(--bento-rose))",
        "bento-teal": "hsl(var(--bento-teal))",
        "bento-indigo": "hsl(var(--bento-indigo))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        header: {
          DEFAULT: "hsl(var(--header-bg))",
        },
        content: {
          DEFAULT: "hsl(var(--content-bg))",
        },
        nav: {
          hover: "hsl(var(--nav-hover))",
          active: "hsl(var(--nav-active))",
        },
        brewm: {
          bg: "hsl(var(--bg))",
          fg: "hsl(var(--fg))",
          mid: "hsl(var(--mid))",
          off: "hsl(var(--off))",
          g18s: "hsl(var(--g18s))",
          ac: "hsl(var(--ac))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
