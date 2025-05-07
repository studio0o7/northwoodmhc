// Theme configuration for Northwood Estates website
// Edit this file to change the color scheme across all components

// Main color scheme
export const colors = {
  // Primary colors
  primary: {
    50: 'emerald-50',    // Light background
    100: 'emerald-100',  // Lighter accents
    200: 'emerald-200',  // Light borders
    300: 'emerald-300',  // Input borders
    400: 'emerald-400',  // Footer headings
    500: 'emerald-500',  // Dividers
    600: 'emerald-600',  // Buttons, accents
    700: 'emerald-700',  // Text, medium emphasis
    800: 'emerald-800',  // Text, stronger emphasis
    900: 'emerald-900',  // Headings, high emphasis
  },
  
  // Supporting colors
  supporting: {
    white: 'white',
    accent: 'amber-500',  // New accent color for highlights and special elements
    red: {
      50: 'red-50',
      200: 'red-200',
      500: 'red-500',
      600: 'red-600',
      700: 'red-700',
      800: 'red-800',
    },
    gray: {
      100: 'gray-100',
      200: 'gray-200',
      300: 'gray-300',
      400: 'gray-400',  // Disabled state
      500: 'gray-500',
    }
  },
};

// Common component styles - can be extended for more components
export const componentStyles = {
  // Button styles
  button: {
    primary: `bg-${colors.primary[600]} hover:bg-${colors.primary[700]} text-white shadow-md hover:shadow-lg transition-all duration-300`,
    secondary: `bg-white border-2 border-${colors.primary[300]} text-${colors.primary[600]} hover:bg-${colors.primary[50]} shadow-sm hover:shadow-md transition-all duration-300`,
    accent: `bg-${colors.supporting.accent} hover:bg-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-300`,
  },
  
  // Section backgrounds
  section: {
    light: `bg-${colors.primary[50]}`,
    dark: `bg-${colors.primary[900]}`,
    white: `bg-white`,
    gradient: `bg-gradient-to-br from-${colors.primary[50]} to-${colors.primary[100]}`,
  },
  
  // Text styles
  text: {
    heading: `text-${colors.primary[900]}`,
    body: `text-${colors.primary[700]}`,
    light: `text-${colors.primary[400]}`,
    accent: `text-${colors.supporting.accent}`,
  },
  
  // Form styles
  form: {
    input: `border-${colors.primary[300]} focus:ring-${colors.primary[200]} focus:border-${colors.primary[400]} transition-all duration-300`,
    label: `text-${colors.primary[700]} font-medium`,
    focus: `ring-${colors.primary[300]} border-${colors.primary[400]}`,
  },
  
  // Card styles
  card: {
    default: `bg-white border border-${colors.primary[200]} rounded-lg shadow-md hover:shadow-lg transition-all duration-300`,
    highlight: `bg-white border-2 border-${colors.primary[300]} rounded-lg shadow-md hover:shadow-lg transition-all duration-300`,
  }
};

// Type for section background options
type SectionBackground = 'light' | 'dark' | 'white' | 'gradient';

// Helper function to get a complete class string for common elements
export const getStyle = {
  primaryButton: (additionalClasses = '') => 
    `${componentStyles.button.primary} px-6 py-3 rounded-lg font-semibold ${additionalClasses}`,
    
  secondaryButton: (additionalClasses = '') => 
    `${componentStyles.button.secondary} px-6 py-3 rounded-lg font-semibold ${additionalClasses}`,
  
  accentButton: (additionalClasses = '') => 
    `${componentStyles.button.accent} px-6 py-3 rounded-lg font-semibold ${additionalClasses}`,
    
  heading: (additionalClasses = '') => 
    `${componentStyles.text.heading} font-bold ${additionalClasses}`,
    
  sectionContainer: (background: SectionBackground = 'light', additionalClasses = '') => 
    `${componentStyles.section[background]} py-16 ${additionalClasses}`,
    
  card: (additionalClasses = '') => 
    `${componentStyles.card.default} p-6 ${additionalClasses}`,
    
  highlightCard: (additionalClasses = '') => 
    `${componentStyles.card.highlight} p-6 ${additionalClasses}`,
};

// Instructions:
// To change the entire color scheme, simply replace 'emerald' with your desired color
// in the primary color definition above (e.g., change 'emerald-600' to 'blue-600')
// Available color options: slate, gray, zinc, neutral, stone, red, orange, 
// amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose 