import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import resultados from '../dados/Resultados'; 


export default function TelaAgendamento() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const markedDatesObj = {};

    const dotColors = ['#015C92'];

    resultados.forEach((item, index) => {
      const formattedDate = item.data;

      if (!markedDatesObj[formattedDate]) {
        markedDatesObj[formattedDate] = {
          dots: [{ color: dotColors[index % dotColors.length] }], 
        };
      } else {
        markedDatesObj[formattedDate].dots.push({
          color: dotColors[index % dotColors.length],
        });
      }
    });

    setMarkedDates(markedDatesObj);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Marcar para:</Text>
        </View>

        <View style={{ marginTop: '20%' }}>
          <Calendar
            onDayPress={() => navigation.navigate('ManutencaoAdicionar')}
            markingType="multi-dot"
            markedDates={markedDates}
            theme={{
              calendarBackground: '#FFF',
              dayTextColor: '#015C92',
              todayTextColor: '#FFF',
              selectedDayBackgroundColor: '#015C92',
              selectedDayTextColor: '#88CDF6',
              textSectionTitleColor: '#015C92',
              monthTextColor: '#015C92',
              todayBackgroundColor: '#88CDF6',
              dotSize: 200,
            }}
          />
        </View>
      </SafeAreaView>

      <View style={[styles.button, styles.menu]}>
        <TouchableOpacity onPress={() => navigation.navigate('ManutencaoAdicionar')}>
          <AntDesign name="plus" size={24} color="#015C92" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  detalhe: {
    backgroundColor: '#88CDF6',
    top: 0, // Posicione o detalhe na parte superior
    left: 0,
    right: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
    height: 100,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginTop: 25,
  },

  button: {
    right: 20,
    bottom: 30,
    zIndex: 1,
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
});
