import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons , FontAwesome5, AntDesign  } from '@expo/vector-icons';

const ListaClientes = ({ data, setData, toggleModal, IconePessoa, IconeLixeira }) => {
  const navigation = useNavigation();
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  const toggleOpcoes = () => {
    setMostrarOpcoes(!mostrarOpcoes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style= {{flexDirection: 'row', justifyContent: 'flex-start'}} >
        <Text style={styles.text}>Cliente: {data.attributes.nome} </Text>
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ClienteAtualizar', data)}>
              <FontAwesome5 name="user-edit" size={18} color="#379BD8" style= {{marginHorizontal: 5}} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity activeOpacity={0.7} onPress={() => { setData(data); toggleModal(); }}>
          <IconeLixeira />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.text2}>Contato: {data.attributes.telefone} </Text>
          <Text style={styles.text2}>Endereço: {data.attributes.endereco} </Text>
          <Text style={styles.text2}>Observações: {data.attributes.observacoes} </Text>
        </View>
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('TelaClienteServicos', { id: data.id, dados: data.attributes })}>
              <IconePessoa />
          </TouchableOpacity>
      </View>

      

      <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

      <TouchableOpacity
            style={styles.botao2}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('TelaAgendamentoAdicionar', data)}>
              <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignContent:"center", alignItems: "center" }}>
                <MaterialCommunityIcons name="calendar-edit" size={28} color="#FFF" style= {{marginHorizontal: 5}} />
                <Text style={styles.textbotao}>Nova visita</Text>
              </View>
          </TouchableOpacity>

      <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ManutencaoAdicionar', data)}>
              <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignContent:"center", alignItems: "center" }}>
              <FontAwesome5 name="tools" size={22} color="#379BD8" style= {{marginHorizontal: 5}} />
                <Text style={styles.textbotao2}>Novo serviço</Text>
            </View>
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
    marginBottom: 10
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
    width: "49%",
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#379BD8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
  },

  botao2: {
    width: "49%",
    height: 44,
    backgroundColor: '#379BD8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
  },

  botao3: {
    width: 150,
    height: 44,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderColor: '#379BD8',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
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
