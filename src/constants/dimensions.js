import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';

const { height,width } = Dimensions.get("window")

export const dimensions = {
  // Font Sizes
  fontXS: wp('2.5%'),   // Extra Small
  fontSM: wp('3.5%'),   // Small
  fontMD: wp('4.2%'),   // Medium
  fontLG: wp('5%'),     // Large
  fontXL: wp('6%'),     // Extra Large
  fontXXL: wp('7.5%'),  // Super Large

  // Padding
  paddingXS: wp('2%'),
  paddingSM: wp('3%'),
  paddingMD: wp('4%'),
  paddingLG: wp('5%'),
  paddingXL: wp('6%'),

  // Margin
  marginXS: wp('2%'),
  marginSM: wp('3%'),
  marginMD: wp('4%'),
  marginLG: wp('5%'),
  marginXL: wp('6%'),

  height,
  width
};
