import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListaClientes = ({data, setData, toggleModal, IconePessoa, IconeLixeira}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      
          <Text style={styles.text}>Cliente: {data.attributes.nome} </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={ () => { setData(data); toggleModal(); }}>
          <IconeLixeira />
          </TouchableOpacity>
          </View>
        
      <View style={styles.content}>
        <View>
          <Text style={styles.text2}>Contato: {data.attributes.telefone} </Text>
          <Text style={styles.text2}>Endereço: {data.attributes.endereco} </Text>
          <Text style={styles.text2}>Observações: {data.attributes.observacoes} </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('TelaClienteServicos', { id: data.id, data: data.attributes })}>
          <IconePessoa />
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
      <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ClienteAtualizar', data)}>
        <Text style={styles.textbotao2}>Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botao2}
        activeOpacity={0.7}
        // onPress={() => navigation.navigate('Agendamento', data)}>
        onPress={() => navigation.navigate('ManutencaoAdicionar', data)}>
        <Text style={styles.textbotao}>Novo serviço</Text>
      </TouchableOpacity>
      </View>    
          
    </View>
  );
};

export default memo(ListaClientes);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#379BD8',
    marginTop: 10,
    borderBottomWidth: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  text: {
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
    fontSize: 18,
    color: '#379BD8',
  },

  text2: {
    fontSize: 14,
    color: '#2D82B5',
    fontFamily: 'Urbanist_700Bold',
    maxWidth: 230,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 15,
    marginHorizontal: 25,
  },

  botao: {
    width: 150,
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#379BD8',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
  },

  botao2: {
    width: 150,
    height: 44,
    backgroundColor: '#379BD8',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
  },

  textbotao: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },
  
  textbotao2: {
    fontSize: 14,
    color: '#379BD8',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },  
});
