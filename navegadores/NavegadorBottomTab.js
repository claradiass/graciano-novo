import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TelaClienteLista from '../screens/TelaClienteLista';
import TelaManutencaoLista from '../screens/TelaManutencaoLista';
import TelaRelatorioDiario from '../screens/TelaRelatorioDiario';
import TelaRelatorioSemanal from '../screens/TelaRelatorioSemanal';
import TelaRelatorioMensal from '../screens/TelaRelatorioMensal';



const Tab = createBottomTabNavigator();

export default function NavegadorBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#88CDF6',
          position: 'absolute',
          bottom: 20,
          left: 16,
          right: 16,
          elevation: 5, // cria uma sombra sutil
          borderRadius: 16,
          height: 60,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#004466',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
      >

      

      <Tab.Screen
        name="TelaClienteLista"
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
                    style={{ alignSelf: 'center'}}
                  />
                </View>
              );
            }
            return <Ionicons name="person" color="#015C92" size={28} style={{ alignSelf: 'center' }} />;
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
                    position: 'absolute',
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
        name="RelatorioDiario"
        component={TelaRelatorioDiario}
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
                  <MaterialCommunityIcons
                    name="calendar-today"
                    color="#88CDF6"
                    size={28}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return <MaterialCommunityIcons name="calendar-today" color="#015C92" size={28} />;
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />

      <Tab.Screen
        name="RelatorioSemanal"
        component={TelaRelatorioSemanal}
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
                  <MaterialIcons
                    name="date-range"
                    color="#88CDF6"
                    size={28}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return <MaterialIcons name="date-range" color="#015C92" size={28} />;
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />   
    </Tab.Navigator>
  );
}
