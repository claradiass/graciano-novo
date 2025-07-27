import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import ItemManutencaoDoCliente from "../components/ItemManutencaoDoCliente";
import { ClienteService } from "../util/services/ClienteService";

export default function TelaClienteServicos({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [servicos, setServicos] = useState([]);
  const { id, dados } = route.params;
  const navigation = useNavigation();

  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  useEffect(() => {
    if (!id) return;

    async function fetchServicos() {
      try {
        const lista = await ClienteService.buscarPorClienteId(id);
        setServicos(lista);
      } catch (err) {
        console.log("Erro ao buscar serviços:", err);
      }
    }

    fetchServicos();
  }, [id]);

  const toggleModal1 = () => setModalVisible(!modalVisible);

  const toggleModal2 = () => {
    setModalVisible(false);
    navigation.navigate("TelaClienteLista", { realizarAtualizacao: true });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Serviços de {dados.nome}</Text>
          <Text style={styles.text2}>Endereço: {dados.endereco}</Text>
          <Text style={styles.text2}>Contato: {dados.telefone}</Text>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() =>
                navigation.navigate("TelaClienteServicosPendentes", {
                  id,
                  dados,
                })
              }
            >
              <Text style={styles.text3}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() =>
                navigation.navigate("TelaClienteServicosConcluidos", {
                  id,
                  dados,
                })
              }
            >
              <Text style={styles.text3}>Concluídos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.area} />
        <FlatList
          data={servicos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ItemManutencaoDoCliente data={item} />}
          ListFooterComponent={renderEmptyItem}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal1}
        >
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>
                Cliente atualizado com sucesso!
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    marginBottom: 90,
  },
  emptyItem: {
    height: 300,
  },
  detalhe: {
    backgroundColor: "#88CDF6",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: "Urbanist_900Black",
    color: "#015C92",
  },
  text2: {
    fontSize: 16,
    fontFamily: "Urbanist_700Bold",
    color: "#015C92",
    textAlign: "left",
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button1: {
    backgroundColor: "#B52D2D",
    width: 80,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontFamily: "Urbanist_700Bold",
    marginTop: 10,
  },
  button2: {
    backgroundColor: "#00A86B",
    width: 80,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontFamily: "Urbanist_700Bold",
    marginTop: 10,
  },
  text3: {
    fontFamily: "Urbanist_700Bold",
    color: "#FFF",
    textAlign: "center",
  },
});
