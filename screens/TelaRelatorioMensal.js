
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import {
  configAxios,
  baseUrlServicos
} from '../util/constantes';

export default function TelaRelatorioMensal() {
  const [servico, setServico] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState([]); // Janeiro (ou qualquer outro mês padrão)
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (servico.length === 0) {
      axios
        .get(baseUrlServicos, configAxios)
        .then(function (response) {
          setServico(response.data.data);
          setAtualizaLista(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [servico, atualizaLista]);

  const calcularTotais = (data) => {
    let totalDespesas = 0;
    let totalValorTotal = 0;

    data.forEach(item => {
      const attributes = item.attributes;
      totalDespesas += attributes.totalDespesas;
      totalValorTotal += attributes.valorTotal;
    });

    return { totalDespesas, totalValorTotal };
  };

  const filterDataByMonth = (selectedMonth) => {
    const filtered = servico.filter(item => {
      const month = new Date(item.attributes.dataFinalizado).getMonth() + 1;
      return month === selectedMonth;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterDataByMonth(selectedMonth);
  }, [selectedMonth]);

  const { totalDespesas, totalValorTotal } = calcularTotais(filteredData);

  const pieData2 = [
    {
      value: totalValorTotal - totalDespesas,
      color: '#015C92',
      gradientCenterColor: '#88CDF6',
      text:("R$ " + (totalValorTotal - totalDespesas)).toString(),
      focused: true,
    },
    {
      value: totalDespesas,
      color: '#88CDF6',
      gradientCenterColor: '#015C92',
      text:("R$ " + totalDespesas).toString(),
    }
  ];

  const months = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 },
    // Adicione os outros meses aqui
  ];


  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          {renderDot('#88CDF6')}
          <Text style={styles.text4}>Total de Despesas: {totalDespesas}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          {renderDot('#015C92')}
          <Text style={styles.text4}>Lucro: {totalValorTotal - totalDespesas} </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
        <View>
          <Text style={styles.text7}>
            Escolha um mês
          </Text>
          <Picker
          style={{ backgroundColor: 'lightgray', borderColor: 'gray', borderWidth: 1 }}
            selectedValue={selectedMonth}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedMonth(itemValue);
            }}
          >
            {months.map((month, index) => (
              <Picker.Item key={index} label={month.label} value={month.value} />
            ))}
          </Picker>
          <View style={{ padding: 20, alignItems: 'center' }}>
            <PieChart
              data={pieData2}
              donut
              showText
              showGradient
              sectionAutoFocus
              radius={150} // Ajuste o valor conforme necessário
              innerRadius={90}
              textColor="white"
              textSize={12}
              fontWeight="bold"
              textAlign="center"
              innerCircleColor={'#FFF'}
              labelPosition="center"
              centerLabelComponent={() => {
                return (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    
                    <Text style={styles.text3}>Valor total</Text>
                    <Text
                      style={styles.text3}>
                      R$ {totalValorTotal}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {renderLegendComponent()}
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
    color: '#88CDF6',
    fontSize: 22,
    textAlign: 'center'
  },
  text4: {
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    fontSize: 16,
    margin: 10,
  },
});



