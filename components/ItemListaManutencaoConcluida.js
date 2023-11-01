import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ItemListaManutencaoConcluida({ data }) {
  const navigation = useNavigation();
  
  if (data.finalizado) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> {data.cliente} </Text>
        <View style={styles.content}>
          <View>
            <Text style={styles.text2}>Contato: {data.contato} </Text>
            <Text style={styles.text2}>Aparelho: {data.aparelho === 'outros' ? data.outros : data.aparelho} </Text>
            <Text style={styles.text2}>Data da manutenção: {data.data} </Text>
            <Text style={styles.text2}>Endereço: {data.local} </Text>
            <Text style={styles.text2}>Descrição do serviço: {data.descricao} </Text>
            <Text style={styles.text2}>Valor do serviço: {data.valorTotal} </Text>
            <Text style={styles.text2}>Despesas: {data.totalDespesas} </Text>
          </View>
          <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ManutencaoVisualizar')}>
            <Text style={styles.textbotao}>Ver detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return null;
  }

};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 30,
    borderColor: '#379BD8',
    backgroundColor: 'rgba(188, 230, 255, 0.5)',
  },

  text: {
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
    fontSize: 18,
    color: '#379BD8',
    marginBottom: 10,
  },

  text2: {
    fontSize: 13,
    color: '#2D82B5',
    fontFamily: 'Urbanist_700Bold',
    maxWidth: 200,
    textAlign: 'center',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
    marginHorizontal: 25,
  },
  botao: {
    width: 100,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#379BD8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  textbotao: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Urbanist_900Black',
  },
});
