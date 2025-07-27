import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, StyleSheet } from "react-native";

import TelaRelatorioMensal from "../screens/TelaRelatorioMensal";
import TelaRelatorioSemanal from "../screens/TelaRelatorioSemanal";
import TelaRelatorioDiario from "../screens/TelaRelatorioDiario";

const Tab = createMaterialTopTabNavigator();

export default function NavegadorRelatorios() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2D82B5",
        tabBarPressColor: "#88CDF6",
        tabBarIndicatorStyle: {
          display: "none",
        },
        tabBarStyle: {
          backgroundColor: "#88CDF6",
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          height: 70,
          elevation: 0, // Remova a faixa branca
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="RelatorioDiario"
        component={TelaRelatorioDiario}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View style={styles.principal}>
                  <Text style={styles.text}>Diário</Text>
                </View>
              );
            }
            return (
              <View style={styles.principal2}>
                <Text style={styles.text2}>Diário</Text>
              </View>
            );
          },
          tabBarLabelStyle: {
            display: "none",
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
                <View style={styles.principal}>
                  <Text style={styles.text}>Semanal</Text>
                </View>
              );
            }
            return (
              <View style={styles.principal2}>
                <Text style={styles.text2}>Semanal</Text>
              </View>
            );
          },
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="RelatorioMensal"
        component={TelaRelatorioMensal}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View style={styles.principal}>
                  <Text style={styles.text}>Mensal</Text>
                </View>
              );
            }
            return (
              <View style={styles.principal2}>
                <Text style={styles.text2}>Mensal</Text>
              </View>
            );
          },
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  principal: {
    borderWidth: 2,
    borderRadius: 40,
    width: 120,
    height: 30,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#2D82B5",
  },

  text: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 14,
    color: "#2D82B5",
  },

  principal2: {
    width: 190,
    height: 30,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },

  text2: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 14,
    color: "#fff",
  },
});
