import { ScrollView, View, Text, TextInput, TouchableOpacity, Modal, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

export default function TelaManutencaoBase({
  tituloTela,
  nomeBotao,
  onPressBotao,
  nome,
  mostrarNome=true,
  mostrarConclusao=true,
  mostrarDataFinalizacao=true,
  dataIniciado,
  dataFinalizado,
  formatarData,
  descricao,
  setDescricao,
  valorTotal,
  setValorTotal,
  totalDespesas,
  setTotalDespesas,
  valorRecebido,
  setValorRecebido,
  itemSelecionado,
  setItemSelecionado, 
  showInput,
  nomeAparelhoManual,
  setNomeAparelhoManual,
  listaOpcoes,
  modalVisible,
  toggleModal,
  toggleModal2,
  onConcluirServico,
  servicoConcluido
}) {
  return (
    <LinearGradient colors={['#88CDF6', '#2D82B5']} style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>{tituloTela}</Text>
          </View>

          <View style={styles.area}>

            <Text style={styles.text2}>Aparelho:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={itemSelecionado}
                onValueChange={setItemSelecionado}
                dropdownIconColor="#fff"
              >
                {listaOpcoes.map((opcao, index) => (
                  <Picker.Item key={index} label={opcao.label} value={opcao.value} />
                ))}
              </Picker>
              {showInput && (
                <View>
                  <Text style={styles.text2}>Nome do aparelho:</Text>
                  <TextInput
                    style={styles.input}
                    value={nomeAparelhoManual}
                    onChangeText={setNomeAparelhoManual}
                    placeholder="Digite o nome do aparelho"
                    placeholderTextColor={'rgba(255,255,255,0.5)'}
                  />
                </View>
              )}
            </View>

            {mostrarNome && (
              <>
              <Text style={styles.text2}>Nome:</Text>
              <TextInput
                style={styles.input}
                value={nome}
                editable={false}
                placeholderTextColor={'#fff'} 
              />
              </>
            )}

            <Text style={styles.text2}>Data:</Text>
            <TextInput
              style={styles.input}
              value={formatarData(dataIniciado)}
              editable={false}
              placeholderTextColor={'#fff'}
            />

            <Text style={styles.text2}>Descrição:</Text>
            <TextInput
              style={styles.input}
              value={descricao}
              onChangeText={setDescricao}
              placeholderTextColor={'#fff'}
            />

            <Text style={styles.text2}>Valor do Serviço:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={valorTotal}
              onChangeText={setValorTotal}
              placeholderTextColor={'#fff'}
            />

            <Text style={styles.text2}>Despesas:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={totalDespesas}
              onChangeText={setTotalDespesas}
              placeholderTextColor={'#fff'}
            />

            <Text style={styles.text2}>Status de Pagamento:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={valorRecebido}
              onChangeText={setValorRecebido}
              placeholderTextColor={'#fff'}
            />
          </View>

          {mostrarConclusao && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'flex-end' }}>
              <Text style={styles.textbotao}>Concluir Serviço</Text>
              <TouchableOpacity onPress={onConcluirServico}>
                {servicoConcluido ? (
                  <MaterialCommunityIcons name="checkbox-marked" size={25} color="#FFF" />
                ) : (
                  <MaterialCommunityIcons name="checkbox-blank-outline" size={25} color="#FFF" />
                )}
              </TouchableOpacity>
            </View>
          )}

          {mostrarDataFinalizacao && (
            <>
              <Text style={styles.text2}>Data de Finalização:</Text>
              <TextInput
                style={styles.input}
                value={dataFinalizado ? formatarData(dataFinalizado) : ''}
                editable={false}
                placeholderTextColor={'#fff'}
              />
            </>
          )}

          <TouchableOpacity style={styles.botao} onPress={onPressBotao}>
            <Text style={styles.textbotao}>{nomeBotao}</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
          >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textbotao}>Operação concluída com sucesso!</Text>
                <View style={styles.bots}>
                  <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                    <Text style={styles.textbotao}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },

  input: {
    width: 320,
    height: 40,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff',
  },
  area: {
    paddingHorizontal: 20,
  },
  botao: {
    width: 200,
    height: 44,
    backgroundColor: '#88CDF6',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
    marginTop: 20,
  },
  pickerContainer: {
    width: 320,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  textbotao: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  bot2:{
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  bots:{
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center'
  }
});