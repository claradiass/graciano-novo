import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { configAxios, baseUrlServicos } from '../util/constantes';
import { useFocusEffect } from '@react-navigation/native';

export default function TelaRelatorioDiario() {
  const [servico, setServico] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({ Despesas: 0, ValorPago: 0, ValorTotal: 0 });

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrlServicos, configAxios);
          setServico(response.data.data);
          setAtualizaLista(false);

          if (selectedDate) {
            getDataForSelectedDate(selectedDate);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [selectedDate])
  );

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    getDataForSelectedDate(day.dateString);
  };

  const getDataForSelectedDate = (selectedDate) => {
    const selectedData = servico.filter(
      (item) =>
        item &&
        item.attributes &&
        item.attributes.dataFinalizado &&
        item.attributes.dataFinalizado.startsWith(selectedDate)
    );

    if (selectedData.length > 0) {
      let totalDespesas = 0;
      let totalValorTotal = 0;

      selectedData.forEach((item) => {
        totalDespesas += item.attributes.totalDespesas;
        totalValorTotal += item.attributes.valorTotal;
      });

      setData({
        Despesas: totalDespesas,
        ValorTotal: totalValorTotal,
      });
    } else {
      setData({ Despesas: 0, ValorTotal: 0 });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho do relatório */}
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Relatório Diário</Text>
      </View>

      <View style={{ marginTop: 70 }}>
        {/* Espaço para evitar que o conteúdo fique embaixo do cabeçalho */}
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
              }}
            >
              <View
                style={{
                  backgroundColor: '#88CDF6',
                  borderRadius: 10,
                  width: 110,
                  height: 150,
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <Text style={styles.text4}>Despesas</Text>
                <Entypo name="emoji-sad" color="#015C92" size={40} />
                <Text style={styles.text4}>R$ {data.Despesas.toFixed(2)}</Text>
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
                }}
              >
                <Text style={styles.text4}>Rendimento</Text>
                <Entypo name="emoji-happy" color="#015C92" size={40} />
                <Text style={styles.text4}>R$ {data.ValorTotal.toFixed(2)}</Text>
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
                }}
              >
                <Text style={styles.text3}>Lucro</Text>
                <Entypo name="emoji-flirt" color="#88CDF6" size={40} />
                <Text style={styles.text3}>
                  R$ {(data.ValorTotal - data.Despesas).toFixed(2)}
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
  detalhe: {
    backgroundColor: '#88CDF6',
    position: 'absolute',  // corrigido o typo
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    width: '100%',
    zIndex: 10,
    top: 0,
    paddingBottom: 20
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginTop: 40,
  },

  calendarContainer: {
    padding: 20,
    marginTop: 40
  },
  dataContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 110,
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

