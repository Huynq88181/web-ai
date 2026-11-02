/**
 * CRM UI design tokens. Keep in sync with styles/tokens.scss.
 * @see docs/UI_SPEC.md
 */
const fontFamily =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

const colors = {
  primary: '#141DD2',
  success: '#00791E',
  warning: '#865900',
  error: '#BB0916',
  bgPage: '#F4F4F6',
  bgContainer: '#FFFFFF',
  bgSuccess: '#DFF5E5',
  bgWarning: '#F9EDD5',
  bgError: '#FFE9E3',
  textPrimary: '#0F0F11',
  textSecondary: '#7E8084',
  textDisabled: '#ADAEB1',
  borderDefault: '#EEEEEF',
  white: '#fff',
  tableHeadBg: '#ECF7FE',
  primaryTintBg: '#E8E9FC',
  primaryLight: '#8D92F5',
  panelHeaderBg: '#F3F4FE',
};

const layout = {
  borderRadius: '8px',
  btnHeightLg: '36px',
  btnHeightSm: '32px',
};

const antdTheme = {
  token: {
    colorPrimary: colors.primary, colorSuccess: colors.success,
    colorWarning: colors.warning, colorError: colors.error,
    colorText: colors.textPrimary, colorTextSecondary: colors.textSecondary,
    colorTextDisabled: colors.textDisabled, colorBorder: colors.borderDefault,
    colorBgLayout: colors.bgPage, colorBgContainer: colors.bgContainer,
    borderRadius: 8, fontSize: 11.664,
    controlHeight: 32, controlHeightSM: 24, fontFamily
  },
  components: {
    Table: { headerBg: colors.tableHeadBg },
    Alert: {
      colorSuccessBg: colors.bgSuccess, colorWarningBg: colors.bgWarning,
      colorErrorBg: colors.bgError
    }
  }
};

module.exports = {
  antdTheme,
  fontFamily,
  colors,
  layout,
};
