import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios'; 
import { 
  configAxios,
  baseUrlServicos
} from '../util/constantes';

export default function TelaRelatorioDiario() {
  const [servico, setServico] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({ Despesas: 0, ValorPago: 0, ValorTotal: 0 });

  useEffect(() => {
    axios
      .get(baseUrlServicos, configAxios)
      .then(function (response) {
        setServico(response.data.data);
        setAtualizaLista(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [atualizaLista]);

  // Função para buscar os dados do dia selecionado
  const getDataForSelectedDate = (selectedDate) => {
    const selectedData = servico.find(item => item.attributes.dataFinalizado === selectedDate);

    if (selectedData) {
      // Se os dados forem encontrados, atualize o estado 'data'
      setData({
        Despesas: selectedData.attributes.totalDespesas,
        // ValorPago: selectedData.attributes.valorRecebido,
        ValorTotal: selectedData.attributes.valorTotal,
      });
    } else {
      // Caso contrário, defina todos os valores como 0
      setData({ Despesas: 0, ValorTotal: 0 });
    }
  };

  // Função para lidar com a seleção de data no calendário
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    getDataForSelectedDate(day.dateString);
  };

  return (
    <ScrollView  style={styles.container}>
    <View>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{ [selectedDate]: { selected: true } }}
          theme={{
            calendarBackground: '#88CDF6',
            dayTextColor: '#FFF',
            dayBackgroundColor: 'black',
            todayTextColor: '#015C92',
            textSectionTitleColor: '#015C92',
            monthTextColor: '#FFF',
            selectedDayBackgroundColor: '#FFF',
            selectedDayTextColor: '#015C92',
            arrowColor: '#FFF',
          }}
          style={styles.roundedCalendar}
        />
      </View>
      {data && (
        <View style={styles.dataContainer}>
          <Text style={styles.text7}>Dados do Dia Selecionado</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <View
              style={{
                backgroundColor: '#88CDF6',
                borderRadius: 10,
                width: 110,
                height: 150,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text style={styles.text4}>Despesas</Text>
              <Entypo name="emoji-sad" color="#015C92" size={40} />
              <Text style={styles.text4}>R$ {data.Despesas}</Text>
            </View>

            <View
              style={{
                backgroundColor: '#88CDF6',
                borderRadius: 10,
                width: 110,
                height: 150,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text style={styles.text4}>Rendimento</Text>
              <Entypo name="emoji-happy" color="#015C92" size={40} />
              <Text style={styles.text4}>R$ {data.ValorTotal}</Text>
            </View>
            <View
              style={{
                backgroundColor: '#015C92',
                borderRadius: 10,
                width: 110,
                height: 150,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text style={styles.text3}>Lucro</Text>
              <Entypo name="emoji-flirt" color="#88CDF6" size={40} />
              <Text style={styles.text3}>
                R$ {data.ValorTotal - data.Despesas}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    padding: 20,
  },
  dataContainer: {
    flex: 1,
    marginTop: 20,
  },
  roundedCalendar: {
    borderRadius: 10,
  },

  text7: {
    fontSize: 20,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginBottom: 10,
    marginLeft: 8,
    alignSelf: 'center',
    textAlign: 'center',
  },
  text3: {
    fontFamily: 'Urbanist_900Black',
    color: '#FFF',
    fontSize: 16,
    margin: 10,
  },
  text4: {
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    fontSize: 16,
    margin: 10,
  },
});

