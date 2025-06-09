import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavegadorRelatorios from "../navegadores/NavegadorRelatorios"

export default function TelaRelatorio() {
  return (
    <View style={styles.container}>
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Relatório</Text>
      </View>
      <NavegadorRelatorios />        
    </View>
  );
};


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginTop: 20,
  },
  detalhe: {
    backgroundColor: '#88CDF6',
    posistion: 'absolute',
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
  },
})