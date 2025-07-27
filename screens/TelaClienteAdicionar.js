import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClienteService } from "../util/services/ClienteService";

export default function TelaClienteAdicionar({ navigation }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const formatarTelefone = (input) => {
    const numeroLimpo = input.replace(/[^\d]/g, "");
    const formatoTelefone = `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(
      2,
      3
    )} ${numeroLimpo.slice(3, 7)}-${numeroLimpo.slice(7, 11)}`;
    setTelefone(formatoTelefone);
  };

  async function adicionar() {
    const dados = {
      nome,
      telefone,
      endereco,
      observacoes,
    };

    try {
      await ClienteService.adicionarCliente(dados);
    } catch (error) {
      Alert.alert("Erro", "Houve um problema ao salvar o cliente.");
    } finally {
      navigation.navigate("TelaClienteLista", { realizarAtualizacao: true });
    }
  }

  const toggleModal1 = () => {
    setModalVisible(!modalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("TelaClienteLista");
  };
  return (
    <LinearGradient colors={["#88CDF6", "#2D82B5"]} style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Adicionar cliente</Text>
          </View>
          <View style={styles.area}>
            <View>
              <Text style={styles.text2}>Nome do cliente:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={"#fff"}
                value={nome}
                onChangeText={setNome}
              />
            </View>
            <View>
              <Text style={styles.text2}>Contato:</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#fff"
                keyboardType="numeric"
                value={telefone}
                onChangeText={formatarTelefone}
              />
            </View>
            <View>
              <Text style={styles.text2}>Endereço:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={"#fff"}
                value={endereco}
                onChangeText={setEndereco}
              />
            </View>

            <View>
              <Text style={styles.text2}>Observações:</Text>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={"#fff"}
                value={observacoes}
                onChangeText={setObservacoes}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.7}
            onPress={adicionar}
          >
            <Text style={styles.textbotao}>Adicionar Cliente</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal1}
          >
            <StatusBar
              backgroundColor="rgba(0, 0, 0, 0.5)"
              translucent={true}
            />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textbotao}>
                  Cliente adicionado com sucesso!
                </Text>
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
    fontFamily: "Urbanist_900Black",
    color: "#fff",
  },
  text2: {
    fontSize: 16,
    fontFamily: "Urbanist_700Bold",
    color: "#fff",
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    width: 320,
    height: 40,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: "Urbanist_700Bold",
    color: "#fff",
  },
  area: {
    justifyContent: "center",
    alignItems: "center",
  },
  botao: {
    width: 200,
    height: 44,
    backgroundColor: "#88CDF6",
    borderRadius: 40,
    justifyContent: "center",
    alignSelf: "center",
    elevation: 4,
    marginTop: 40,
  },

  textbotao: {
    fontSize: 14,
    color: "white",
    fontFamily: "Urbanist_900Black",
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#379BD8",
    margin: 20,
    width: 280,
    height: 140,
    borderRadius: 20,
    padding: 35,
    elevation: 5,
  },
  bot2: {
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bots: {
    marginHorizontal: 20,
    marginTop: 20,
    alignSelf: "center",
  },
});
