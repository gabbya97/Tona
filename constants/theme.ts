export const theme = {
  colors: {
    primary: '#B05A7A', // Blush pink (main brand color)
    primaryLight: '#F2D9E6', // Light blush for backgrounds/accents
    primaryExtraLight: '#FCF5F8', // Very light blush for subtle backgrounds
    
    secondary: '#7A50B0', // Lavender purple
    secondaryLight: '#E9DEF5', // Light lavender
    
    accent: '#5AB0A7', // Teal accent
    accentLight: '#D9F2EF', // Light teal
    
    success: '#50B069', // Green for success states
    successLight: '#DEF5E3', // Light green
    
    warning: '#B0A150', // Yellow for warnings
    warningLight: '#F5F2DE', // Light yellow
    
    error: '#B05A5A', // Red for errors
    errorLight: '#F5DEDE', // Light red
    
    text: '#2D2D2D', // Almost black for main text
    textLight: '#757575', // Gray for secondary text
    
    background: '#F8F8F8', // Light gray for main background
    backgroundLight: '#F0F0F0', // Slightly darker gray for card backgrounds
    
    white: '#FFFFFF', // Pure white
    
    border: '#E0E0E0', // Medium gray for borders
    borderLight: '#EFEFEF', // Light gray for subtle borders
  },
  
  fonts: {
    headingBold: 'Outfit-Bold',
    headingSemiBold: 'Outfit-SemiBold',
    headingMedium: 'Outfit-Medium',
    
    bodyRegular: 'Outfit-Regular',
    bodyMedium: 'Outfit-Medium',
    bodySemiBold: 'Outfit-SemiBold',
    
    accentBold: 'Montserrat-Bold',
    accentSemiBold: 'Montserrat-SemiBold',
  },
  
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
  },
  
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    extraLarge: 24,
    round: 9999,
  },
};