import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, FontAwesome5, Feather  } from '@expo/vector-icons';
import { Card } from 'react-native-paper';



ListaAgenda = ({ data, setData, toggleModal }) => {
    const navigation = useNavigation();
    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
    const toggleOpcoes = () => {
        setMostrarOpcoes(!mostrarOpcoes);
    };

    return (
        <View style={{ marginRight: 10, marginTop: 20 }}>
            <Card>
                <Card.Content>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    aligndatas: 'center',
                    }}>
                    <View>
                    <Text style={styles.textbotao3}>{data.hora}</Text>
                    <Text style={styles.textbotao3}>{data.hora.slice(0, -7)}</Text>
                    </View>
                    <View>
                    <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { 
                    setData(data);
                    toggleModal();
                        }}
                    >
                    <Feather
                        name="trash-2"
                        color="#053F5C"
                        size={25}
                        style={{ alignSelf: 'center' }}
                    />
                    </TouchableOpacity>

                    <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('TelaAgendamentoAtualizar')}>
                    
                    <Feather
                        name="edit"
                        color="#053F5C"
                        size={25}
                        style={{ alignSelf: 'center', marginTop: 10 }}
                    />
                    </TouchableOpacity>
                    </View>
                </View>
                </Card.Content>
            </Card>
      </View>
    );
};

export default memo(ListaAgenda);

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
    aligndatas: 'center',
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
    aligndatas: 'center',
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
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
  },

  botao2: {
    width: 150,
    height: 44,
    backgroundColor: '#379BD8',
    borderRadius: 10,
    justifyContent: 'center',
    aligndatas: "center",
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
  },

  botao3: {
    width: 150,
    height: 44,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderColor: '#379BD8',
    justifyContent: 'center',
    aligndatas: 'center',
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

  textbotao3: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_900Black',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    aligndatas: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#379BD8',
    margin: 20,
    width: 280,
    height: 140,
    borderRadius: 20,
    padding: 35,
    elevation: 5,
  },
  bot:{
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    aligndatas: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  bot2:{
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    aligndatas: 'center',
    justifyContent: 'center'
  },
  bot3:{
    width: 80,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    aligndatas: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  bots:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20
  },
  detalhe: {
    backgroundColor: '#88CDF6',
    posistion: 'absolute',
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#FFF',
    marginTop: 20,
  },
  emptydata: {
    height: 2000, 
  },
});





// ItemListaAgenda.js

// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// const ItemListaAgenda = ({ data, hora, toggleModal, setData }) => {
//   return (
//     <View style={{ marginRight: 10, marginTop: 20 }}>
//       {/* Renderize os dados conforme necessário */}
//       <Text>{data}</Text>
//       <Text>{hora}</Text>

      
//     </View>
//   );
// };

// export default ItemListaAgenda;
