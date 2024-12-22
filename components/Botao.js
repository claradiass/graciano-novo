import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AntDesign, Entypo } from '@expo/vector-icons';


export default function Botao() {

  const navigation = useNavigation();

  animation = new Animated.Value(0);

  togglemenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
    }).start();

    this.open = !this.open;
  };

  const op1 = {
    transform: [
      { scale: this.animation},
      {
        translateY: this.animation.interpolate ({
           inputRange: [0, 1],
           outputRange: [0, -60]
        })
      }
    ]
  }

  const rotation = {
    transform: [
      {
        rotate: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }
    ]
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.submenu]}>
          <AntDesign name="heart" size={20} />
        </Animated.View>
      </TouchableWithoutFeedback >
      <TouchableWithoutFeedback onPress={() => navigation.navigate('ManutencaoListaAtrasados')}>
        <Animated.View style={[styles.button, styles.submenu, op1]}>
          <Entypo name="camera" size={20} />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={this.togglemenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    right: 50,
    bottom: 220,
  },

  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#88CDF6',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },

  menu: {
    backgroundColor: '#88CDF6',
  },

  submenu: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#88CDF6',
  },
});
