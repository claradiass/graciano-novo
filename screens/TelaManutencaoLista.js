import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  StatusBar,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import ItemListaManutencao from "../components/ItemListaManutencao";
import { ManutencaoService } from "../util/services/ManutencaoService";

export default function TelaManutencaoLista({ route, navigation }) {
  const [servicos, setServicos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [list, setList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [possuiElementos, setPossuiElementos] = useState(true);

  const pageSize = 20;
  const token = useSelector((state) => state.login.token);


  const iconeLixeira = () => (
    <Feather
      name="trash-2"
      color="#015C92"
      size={22}
      style={{ alignSelf: "center" }}
    />
  );

  const atualiza = useCallback(
    async (ignorarPossuiElementos = false) => {
      if (!token || (!ignorarPossuiElementos && !possuiElementos)) return;

      console.log("atualizando lista de serviços...");

      try {
        const resposta = await ManutencaoService.buscarManutencoes(page, pageSize, token);
        
        // Transformar cada item mantendo todos os atributos necessários
        const novasManutencoes = resposta.map((item) => {
          const attrs = item.attributes || {};
          const clienteNome = attrs.cliente?.data?.attributes?.nome || "Desconhecido";

          return {
            id: item.id,
            ...attrs, // Inclui todos os atributos originais
            clienteNome,
            attributes: attrs // Mantém a estrutura original que o componente espera
          };
        });

        console.log("Serviços processados:", novasManutencoes);

        if (novasManutencoes.length > 0) {
          setServicos((prev) => [
            ...prev,
            ...novasManutencoes.filter((novo) => !prev.some((m) => m.id === novo.id))
          ]);

          if (novasManutencoes.length < pageSize) {
            setPossuiElementos(false);
          } else {
            setPage((prev) => prev + 1);
          }
        } else {
          setPossuiElementos(false);
        }

        setExcluidoModalVisible(false);
      } catch (error) {
        console.log("Erro ao atualizar serviços:", error);
        Alert.alert("Erro", "Não foi possível carregar os serviços.");
      }
    },
    [token, page, possuiElementos]
  );



  async function remover() {
    try {
      await ManutencaoService.excluirManutencao(data.id);
      setAtualizaLista((prev) => prev + 1);
      mostrarMensagemExcluido();
    } catch (error) {
      Alert.alert("Erro", "Erro ao excluir serviço.");
    }
  }

  useEffect(() => {
    atualiza();
  }, []);

  useEffect(() => {
    atualiza();
    setExcluidoModalVisible(false);
  }, [atualizaLista, route.params]);

  useEffect(() => {
    if (searchText === "") {
      setList(servicos);
    } else {
      const termo = searchText.toLowerCase();
      const filtrados = servicos.filter((item) => {
        const { aparelho, outros, clienteNome } = item;
        return (
          aparelho?.toLowerCase().includes(termo) ||
          outros?.toLowerCase().includes(termo) ||
          clienteNome.toLowerCase().includes(termo)
        );
      });
      setList(filtrados);
    }
  }, [searchText]);

  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleModal2 = () => setModalVisible2(!modalVisible2);

  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };

  const mostrarMensagemExcluido2 = () => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  };

  const renderItem = ({ item }) => (
    <ItemListaManutencao
      data={item}
      toggleModal={toggleModal}
      setData={setData}
      IconeLixeira={iconeLixeira}
    />
  );

  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Serviços:</Text>

          <TextInput
            style={styles.input}
            placeholder="Busque aqui pelo nome do cliente ou aparelho"
            placeholderTextColor={"#015C92"}
            value={searchText}
            onChangeText={setSearchText}
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() =>
                navigation.navigate("TelaManutencaoListaAtrasados")
              }
            >
              <Text style={styles.text3}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate("TelaManutencaoListaConcluidas")}
            >
              <Text style={styles.text3}>Concluídos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          style={styles.flat}
          data={list}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => item ? renderItem({ item }) : null}
          ListFooterComponent={renderEmptyItem}
          onEndReached={atualiza}
          onEndReachedThreshold={0.5}
        />

        {/* Modal 1 - Confirmar Exclusão */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Deseja excluir esse serviço?</Text>
              <View style={styles.bots}>
                <TouchableOpacity style={styles.bot} onPress={remover}>
                  <Text style={styles.textbotao2}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
                  <Text style={styles.textbotao}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal 2 - Exclusão concluída */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={excluidoModalVisible}
          onRequestClose={() => setExcluidoModalVisible(false)}
        >
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>
                Serviço excluído com sucesso!
              </Text>
              <TouchableOpacity
                style={styles.bot3}
                onPress={() => atualiza()}
              >
                <Text style={styles.textbotao2}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal 3 - Confirmar Conclusão */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={toggleModal2}
        >
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Deseja concluir serviço?</Text>
              <View style={styles.bots}>
                <TouchableOpacity
                  style={styles.bot}
                  onPress={mostrarMensagemExcluido2}
                >
                  <Text style={styles.textbotao2}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                  <Text style={styles.textbotao}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal 4 - Conclusão confirmada */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={excluidoModalVisible2}
          onRequestClose={() => setExcluidoModalVisible2(false)}
        >
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>
                Serviço concluído com sucesso!
              </Text>
              <TouchableOpacity
                style={styles.bot3}
                onPress={() => setExcluidoModalVisible2(false)}
              >
                <Text style={styles.textbotao2}>Fechar</Text>
              </TouchableOpacity>
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
    backgroundColor: "#fff",

    // paddingBottom: 100
  },
  content: {
    marginBottom: 90,
  },
  detalhe: {
    backgroundColor: "#88CDF6",
    posistion: "absolute",

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
    marginTop: 20,
  },
  input: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#015C92",
    margin: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: "Urbanist_700Bold",
    color: "#015C92",
  },
  emptyItem: {
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#fff",
    width: 80,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontFamily: "Urbanist_700Bold",
  },
  text2: {
    fontFamily: "Urbanist_700Bold",
    color: "#88CDF6",
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
  bot: {
    width: 50,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
  bot3: {
    width: 80,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  bots: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  button1: {
    backgroundColor: "#015C92",
    width: 80,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontFamily: "Urbanist_700Bold",
    marginTop: 10,
  },
  button2: {
    backgroundColor: "#015C92",
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
  textbotao: {
    fontSize: 14,
    color: "white",
    fontFamily: "Urbanist_900Black",
    textAlign: "center",
  },

  textbotao2: {
    fontSize: 14,
    color: "#053F5C",
    fontFamily: "Urbanist_900Black",
    textAlign: "center",
  },
});
