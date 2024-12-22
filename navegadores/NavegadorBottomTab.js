import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo } from '@expo/vector-icons';

import TelaClienteLista from '../screens/TelaClienteLista';
import TelaAgenda from '../screens/TelaAgenda';
import TelaManutencaoLista from '../screens/TelaManutencaoLista';
import TelaRelatorio from '../screens/TelaRelatorio';



const Tab = createBottomTabNavigator();

export default function NavegadorBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#88CDF6',
          position: 'absolute',
          borderTopWidth: 0,
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          borderRadius: 8,
          height: 60,
        },
      }}>

      

      <Tab.Screen
        name="ClienteLista"
        component={TelaClienteLista}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: '#015C92',
                    width: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <Ionicons
                    name="person-outline"
                    color="#88CDF6"
                    size={28}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return <Ionicons name="person" color="#015C92" size={28} />;
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />


      <Tab.Screen
        name="TelaAgenda"
        component={TelaAgenda}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: '#015C92',
                    width: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <Ionicons
                    name="md-calendar-sharp"
                    color="#88CDF6"
                    size={28}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return (
              <Ionicons name="md-calendar-sharp" color="#015C92" size={28} />
            );
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />

      
      
      <Tab.Screen
        name="TelaManutencaoLista"
        component={TelaManutencaoLista}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: '#015C92',
                    width: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <Entypo
                    name="tools"
                    color="#88CDF6"
                    size={28}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return <Entypo name="tools" color="#015C92" size={28} />;
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      

      

      <Tab.Screen
        name="Relatorio"
        component={TelaRelatorio}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: '#015C92',
                    width: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <Ionicons
                    name="ios-bar-chart-outline"
                    color="#88CDF6"
                    size={28}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return (
              <Ionicons name="ios-bar-chart" color="#015C92" size={28} />
            );
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
    </Tab.Navigator>
  );
}
