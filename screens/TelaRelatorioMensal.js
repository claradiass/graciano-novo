import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import {
  configAxios,
  baseUrlServicos
} from '../util/constantes';

export default function TelaRelatorioMensal() {
  const [servico, setServico] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(baseUrlServicos, configAxios);
          setServico(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [selectedMonth])
  );

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

  const filterDataByMonthAndYear = (month, year) => {
    const filtered = servico.filter(item => {
      const date = new Date(item.attributes.dataFinalizado);
      return (date.getMonth() + 1 === month && date.getFullYear() === year);
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterDataByMonthAndYear(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const { totalDespesas, totalValorTotal } = calcularTotais(filteredData);

  const pieData2 = [
    {
      value: totalValorTotal - totalDespesas,
      color: '#015C92',
      text: `R$ ${(totalValorTotal - totalDespesas).toFixed(2)}`,
      focused: true,
    },
    {
      value: totalDespesas,
      color: '#88CDF6',
      text: `R$ ${totalDespesas.toFixed(2)}`,
    },
  ];

  const months = [
    { label: 'Janeiro', value: 1 }, { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 }, { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 }, { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 }, { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 }, { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 }, { label: 'Dezembro', value: 12 }
  ];

  const years = [
    { label: '2023', value: 2023 },
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 },
    { label: '2026', value: 2026 },
    { label: '2027', value: 2027 }
  ];

  const renderDot = color => (
    <View style={{ height: 30, width: 30, borderRadius: 10, backgroundColor: color }} />
  );

  const renderLegendComponent = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        {renderDot('#88CDF6')}
        <Text style={styles.text4}>Total de {'\n'}Despesas: R$ {totalDespesas.toFixed(2)}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        {renderDot('#015C92')}
        <Text style={styles.text4}>Lucro: R$ {(totalValorTotal - totalDespesas).toFixed(2)}</Text>
      </View>
    </View>
  );

  const renderItem = item => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === value && (
        <FontAwesome5 style={styles.icon} name="calendar-check" color="#015C92" size={20} />
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho do relatório */}
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Relatório Mensal</Text>
      </View>

      <View style={{ marginTop: 90 }}>
        <Text style={styles.text7}>Escolha um mês e um ano</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={months}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Escolha um mês"
            searchPlaceholder="Pesquise..."
            value={selectedMonth}
            onChange={(item) => setSelectedMonth(item.value)}
            renderLeftIcon={() => (
              <FontAwesome5 style={styles.icon} name="calendar-check" color="#015C92" size={20} />
            )}
            renderItem={renderItem}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={years}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Escolha um ano"
            searchPlaceholder="Pesquise..."
            value={selectedYear}
            onChange={(item) => setSelectedYear(item.value)}
            renderLeftIcon={() => (
              <FontAwesome5 style={styles.icon} name="calendar-check" color="#015C92" size={20} />
            )}
            renderItem={renderItem}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <PieChart
            data={pieData2}
            donut
            showText
            showValuesAsLabels
            focusOnPress
            radius={150}
            innerRadius={75}
            textColor="white"
            textSize={13}
            fontWeight="bold"
            textAlign="center"
            innerCircleColor={'#FFF'}
            labelPosition="center"
            centerLabelComponent={() => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.text3}>Valor total</Text>
                <Text style={styles.text3}>R$ {totalValorTotal.toFixed(2)}</Text>
              </View>
            )}
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
  detalhe: {
    backgroundColor: '#88CDF6',
    position: 'absolute',
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    width: '100%',
    zIndex: 10,
    top: 0,
    paddingBottom: 5,
    marginBottom: 100
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginTop: 40,
  },
  text7: {
    marginTop: 40,
    fontSize: 20,
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    marginLeft: 8,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10
  },
  text3: {
    fontFamily: 'Urbanist_900Black',
    color: '#379BD8',
    fontSize: 22,
    textAlign: 'center'
  },
  text4: {
    fontFamily: 'Urbanist_900Black',
    color: '#015C92',
    fontSize: 16,
    margin: 10,
    textAlign: 'center'
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: "45%",
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderColor: "#379BD8",
    borderWidth: 2,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
