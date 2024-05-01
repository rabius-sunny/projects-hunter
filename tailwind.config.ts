import type { Config } from 'tailwindcss'
import colors, { cyan, emerald, slate, white } from 'tailwindcss/colors'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      primary: '#fa541c',
      secondary: colors.indigo[500],
      heading: colors.slate[700],
      text: colors.slate[600],
      black: colors.slate[800],
      cyan,
      emerald,
      white,
      slate
    }
  },
  plugins: []
}
export default config
