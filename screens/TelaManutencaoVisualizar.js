import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TelaManutencaoVisualizar({route}) {
  const {data} = route.params
  
  return (
    <LinearGradient colors={['#88CDF6', '#2D82B5']} style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Nome do cliente</Text>
          </View>
          <View style={styles.area}>
            <Text style={styles.text2}> Aparelho:{data.aparelho} </Text>

            <Text style={styles.text2}>Contato: </Text>

            <Text style={styles.text2}>Local: </Text>

            <Text style={styles.text2}>Data: {data.data} </Text>

            <View>
              <Text style={styles.text2}>Descrição do serviço: {data.descricao}</Text>
              
            </View>

          

            <View>
              <Text style={styles.text2}>Observações:</Text>
              
            </View>
            <View>
              <Text style={styles.text2}>Valor do serviço:</Text>
              
            </View>
            <View>
              <Text style={styles.text2}>Despesas:</Text>
              
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginBottom: 90,
  },
  detalhe: {
    paddingLeft: 20,
    paddingBottom: 25,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#fff',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Urbanist_700Bold',
    color: 'red',
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',

  },
});
