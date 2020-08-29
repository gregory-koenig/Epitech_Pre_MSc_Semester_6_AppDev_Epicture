import { StyleSheet } from 'react-native';
import { colors, fontSize, fonts } from './variables';

const principalContainer = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.darkGray,
};

const container = {
  width: '100%',
  fontFamily: fonts.titleFont,
  backgroundColor: '#272727',
};

const flexRowContainer = {
  flexDirection: 'row',
};

const flexColumnContainer = {
  flexDirection: 'column',
};

const principalTitle = {
  fontFamily: fonts.titleFont,
  color: colors.white,
  fontSize: fontSize.principalTitle,
  marginBottom: 3,
  marginTop: 10,
};

const headingTitle = {
  fontFamily: fonts.titleFont,
  color: colors.white,
  fontSize: fontSize.headingTitle,
  marginBottom: 8,
  marginTop: 30,
};

const headingElementTitle = {
  fontFamily: fonts.textFont,
  color: colors.white,
  fontSize: fontSize.headingElementTitle,
  marginBottom: 0,
  marginTop: 2,
};

const spinnerContainer = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.lightGray,
  marginTop: 200,
};

const boldText = {
  fontFamily: fonts.boldTextFont,
  color: colors.white,
  fontSize: fontSize.standardText,
};

const standardText = {
  fontFamily: fonts.lightTextFont,
  fontSize: fontSize.standardText,
  color: colors.white,
  flexShrink: 1,
};

const centerText = {
  flexDirection: 'row',
  justifyContent: 'center',
};

const errorView = {
  backgroundColor: colors.error,
  borderWidth: 2,
  borderColor: '#ff0000',
  borderRadius: 8,
  padding: 10,
};

const customStyles = StyleSheet.create({
  principalContainer,
  container,
  flexRowContainer,
  flexColumnContainer,
  principalTitle,
  headingTitle,
  headingElementTitle,
  spinnerContainer,
  standardText,
  boldText,
  centerText,
  errorView,
});

export default customStyles;
