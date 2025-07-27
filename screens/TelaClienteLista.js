import { useState, useEffect, useCallback, useMemo } from "react";
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
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ItemListaCliente from "../components/ItemListaCliente";
import { ClienteService } from "../util/services/ClienteService";

export default function TelaClienteLista({ route, navigation }) {
  const [clientes, setClientes] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [possuiElementos, setPossuiElementos] = useState(true);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const token = useSelector((state) => state.login.token);
  const pageSize = 20;

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);
  const toggleModal2 = useCallback(() => {
    setModalVisible2((prev) => !prev);
  }, []);
  const mostrarMensagemExcluido = useCallback(() => {
    setExcluidoModalVisible(true);
    toggleModal();
  }, [toggleModal]);
  const mostrarMensagemExcluido2 = useCallback(() => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  }, [toggleModal2]);

  const remover = useCallback(async () => {
    try {
      await ClienteService.removerCliente(data.id);
    } catch (error) {
      console.log("Erro ao remover cliente:", error);
      Alert.alert("Erro", "Falha ao remover cliente.");
    } finally {
      setPage(1);
      setPossuiElementos(true);
      setClientes([]);
      setAtualizaLista((prev) => prev + 1);
      mostrarMensagemExcluido();
    }
  }, [data?.id, mostrarMensagemExcluido]);

  const atualiza = useCallback(
    async (ignorarPossuiElementos = false) => {
      if (!token || (!ignorarPossuiElementos && !possuiElementos)) return;

      try {
        const { clientes: novosClientes } =
          await ClienteService.buscarClientesPaginado(page, pageSize, token);

        if (novosClientes.length > 0) {
          setClientes((prev) => [
            ...prev,
            ...novosClientes.filter(
              (novo) => !prev.some((c) => c.id === novo.id)
            ),
          ]);

          if (novosClientes.length < pageSize) {
            setPossuiElementos(false);
          } else {
            setPage((prev) => prev + 1);
          }
        } else {
          setPossuiElementos(false);
        }

        setExcluidoModalVisible(false);
      } catch (error) {
        console.log("Erro ao atualizar clientes, usando cache local:", error);
        const locais = await ClienteService.carregarLocalmente();
        setClientes(locais);
        Alert.alert("Aviso", "Sem conexão. Dados locais carregados.");
      }
    },
    [token, page, possuiElementos]
  );

  useEffect(() => {
    if (!token) {
      navigation.navigate("Login");
    }
  }, [token]);

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      const dadosLocais = await ClienteService.carregarLocalmente();
      setClientes(dadosLocais);
    };
    carregarDadosIniciais();
  }, []);

  useEffect(() => {
    atualiza();
  }, [atualizaLista, route.params, token]);

  const filteredList = useMemo(() => {
    if (searchText.trim() === "") return clientes;
    return clientes.filter((item) =>
      item.attributes.nome.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, clientes]);

  const ordenar = useCallback(() => {
    setClientes((prev) => {
      const ordenado = [...prev];
      ordenado.sort((a, b) => {
        const nomeA = a.attributes.nome.toLowerCase();
        const nomeB = b.attributes.nome.toLowerCase();
        return ascendingOrder
          ? nomeA.localeCompare(nomeB)
          : nomeB.localeCompare(nomeA);
      });
      return ordenado;
    });
    setAscendingOrder((prev) => !prev);
  }, [ascendingOrder]);

  const renderItem = useCallback(
    ({ item }) => (
      <ItemListaCliente
        data={item}
        toggleModal={toggleModal}
        setData={setData}
        IconePessoa={AntDesign}
        IconeLixeira={Feather}
      />
    ),
    [toggleModal, setData]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Clientes:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder="Busque aqui o cliente"
            placeholderTextColor="#015C92"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={ordenar}>
            <MaterialCommunityIcons
              name="order-alphabetical-ascending"
              size={28}
              color="#015C92"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {clientes.length > 0 ? (
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={atualiza}
            onEndReachedThreshold={0.5}
            ListFooterComponent={<View style={styles.emptyItem} />}
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum cliente encontrado!
          </Text>
        )}
      </View>

      <View style={[styles.button, styles.menu]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TelaClienteAdicionar")}
        >
          <FontAwesome6 name="add" size={28} color="#015C92" />
        </TouchableOpacity>
      </View>

      {/* Modais excluído/confirmar */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" translucent />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Deseja excluir esse cliente?</Text>
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

      <Modal
        animationType="slide"
        transparent
        visible={excluidoModalVisible}
        onRequestClose={() => setExcluidoModalVisible(false)}
      >
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" translucent />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Cliente excluído com sucesso!</Text>
            <TouchableOpacity
              style={styles.bot3}
              onPress={() => setExcluidoModalVisible(false)}
            >
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal simulado 2 (serviço) */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible2}
        onRequestClose={toggleModal2}
      >
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" translucent />
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

      <Modal
        animationType="slide"
        transparent
        visible={excluidoModalVisible2}
        onRequestClose={() => setExcluidoModalVisible2(false)}
      >
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" translucent />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Serviço concluído com sucesso!</Text>
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
  );
}

const styles = StyleSheet.create({
  // (mantém os mesmos estilos que você já tinha)
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detalhe: {
    backgroundColor: "#88CDF6",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    padding: 20,
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
    width: "85%",
  },
  emptyItem: {
    height: 50,
  },
  button: {
    right: 20,
    bottom: 80,
    zIndex: 1,
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#88CDF6",
    shadowColor: "#88CDF6",
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
  },
  menu: {
    backgroundColor: "#88CDF6",
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
