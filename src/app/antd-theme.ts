import { ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    // Primary colors
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    
    // Background colors
    colorBgBase: '#0a0a0a',
    colorBgContainer: 'rgba(255, 255, 255, 0.05)',
    colorBgElevated: 'rgba(255, 255, 255, 0.08)',
    colorBgLayout: '#0a0a0a',
    
    // Text colors
    colorText: '#ffffff',
    colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
    colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
    colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',
    
    // Border colors
    colorBorder: 'rgba(255, 255, 255, 0.12)',
    colorBorderSecondary: 'rgba(255, 255, 255, 0.08)',
    
    // Border radius
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    
    // Font
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    Button: {
      colorPrimary: '#00bcd4',
      algorithm: true,
      primaryShadow: '0 2px 8px rgba(0, 188, 212, 0.3)',
    },
    Input: {
      colorBgContainer: 'rgba(255, 255, 255, 0.1)',
      colorBorder: 'rgba(255, 255, 255, 0.2)',
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.4)',
    },
    Card: {
      colorBgContainer: 'rgba(255, 255, 255, 0.05)',
      colorBorderSecondary: 'rgba(255, 255, 255, 0.12)',
    },
    Tag: {
      colorBgContainer: 'rgba(24, 144, 255, 0.2)',
      colorBorder: 'rgba(24, 144, 255, 0.3)',
    },
  },
};

// Custom color palette matching the original design
export const colors = {
  cyan: {
    primary: '#00bcd4',
    light: '#64ffda',
    dark: '#008ba3',
  },
  purple: {
    primary: '#a259f7',
    light: '#c084fc',
    dark: '#7c3aed',
  },
  orange: {
    primary: '#f97316',
    light: '#fb923c',
    dark: '#ea580c',
  },
  green: {
    primary: '#22c55e',
    light: '#4ade80',
    dark: '#16a34a',
  },
  teal: {
    primary: '#14b8a6',
    light: '#2dd4bf',
    dark: '#0d9488',
  },
  gradient: {
    primary: 'linear-gradient(45deg, #64ffda, #a259f7, #ff6b6b)',
  },
};
