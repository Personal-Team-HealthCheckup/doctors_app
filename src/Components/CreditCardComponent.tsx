import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../global/theme';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const CARD_WIDTH = responsiveWidth(80);
const CARD_HEIGHT = CARD_WIDTH * 0.53;

function CreditCardComponent() {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[
          COLORS.tokenGreen,
          COLORS.greeen1,
          COLORS.blueish,
          COLORS.tokenGreen2,
        ]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 0.3 }}
        style={styles.shadowCard}
      />
      <LinearGradient
        colors={[
          COLORS.tokenGreen,
          COLORS.greeen1,
          COLORS.blueish,
          COLORS.tokenGreen2,
        ]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 0.3 }}
        style={styles.linearCard}
      >
        <View style={styles.viewCard}>
          <View style={styles.topRow}>
            <Icon
              name="shield"
              size={20}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <View>
              <Text style={styles.securedBy}>Secured by</Text>
              <Text style={styles.securityName}>
                Virtual Health Assistant Security
              </Text>
            </View>
          </View>

          <View style={styles.middleRow}>
            <Text style={styles.stars}>****</Text>
            <Text style={styles.year}>2023</Text>
          </View>

          <View style={styles.vhaCard}>
            <Text style={styles.tokenText}>VHA Token</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export default CreditCardComponent;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
    width: CARD_WIDTH + responsiveWidth(6),
    overflow: 'visible',
  },
  shadowCard: {
    transform: [{ translateX: 10 }, { translateY: -6 }, { rotate: '6deg' }],
    position: 'absolute',
    top: 10,
    left: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    zIndex: Platform.OS === 'ios' ? 0 : -1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  linearCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
  },
  viewCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    borderColor: COLORS.white,
    borderWidth: 0.9,
    paddingTop: responsiveWidth(5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    zIndex: 1,
    flex: 1,
  },
  securedBy: {
    fontSize: 10,
    fontFamily: FONTS.inter['regular[400]'],
    color: COLORS.white,
  },
  securityName: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: FONTS.inter['bold[700]'],
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
  },
  stars: {
    fontSize: 24,
    color: '#fff',
    letterSpacing: 8,
    fontFamily: FONTS.spaceGrotesk.medium,
  },
  year: {
    fontSize: 20,
    color: '#fff',
    fontFamily: FONTS.spaceGrotesk.medium,
  },
  tokenText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FONTS.spaceGrotesk.medium,
  },
  vhaCard: {
    backgroundColor: COLORS.black,
    paddingHorizontal: responsiveWidth(5),
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    height: CARD_HEIGHT * 0.28,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
