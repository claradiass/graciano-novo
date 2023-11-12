import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';

import TelaClienteServicosConcluidos from '../screens/TelaClienteServicosConcluidos';
import TelaClienteServicosPendentes from '../screens/TelaClienteServicosPendentes';



const Tab = createMaterialTopTabNavigator();

export default function NavegadorRelatorios() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2D82B5',
        tabBarPressColor: '#88CDF6',
        tabBarIndicatorStyle: {
          display: 'none',
        },
        tabBarStyle: {
          backgroundColor: '#88CDF6',
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          height: 70,
          elevation: 0, // Remova a faixa branca
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      }}
      >
      <Tab.Screen
        name="TelaClienteServicosPendentes"
        component={TelaClienteServicosPendentes}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View style={styles.principal}>
                  <Text style={styles.text}>Pendentes</Text>
                </View>
              );
            }
            return (
              <View style={styles.principal2}>
                <Text style={styles.text2}>Pendentes</Text>
              </View>
            );
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="TelaClienteServicosConcluidos"
        component={TelaClienteServicosConcluidos}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View style={styles.principal}>
                  <Text style={styles.text}>Concluidos</Text>
                </View>
              );
            }
            return (
              <View style={styles.principal2}>
                <Text style={styles.text2}>Concluidos</Text>
              </View>
            );
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  principal: {
    
    borderWidth: 2,
    borderRadius: 40,
    width: 120,
    height: 30,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#2D82B5',
  },

  text: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 14,
    color: '#2D82B5',
  },

  principal2: {
    width: 190,
    height: 30,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  text2: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 14,
    color: '#fff',
  },
});
