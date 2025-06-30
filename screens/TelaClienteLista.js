import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  configAxios,
  baseUrlClientes,
  baseUrlClientesPaginado,
} from "../util/constantes";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import ItemListaCliente from "../components/ItemListaCliente";
import { useSelector } from "react-redux";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TelaClienteLista({ route, navigation }) {
  const [clientes, setClientes] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.login.token);
  const [page, setPage] = useState(1);
  // state para controlar se há elementos na lista (se ele já chegou no final dela)
  const [possuiElementos, setPossuiElementos] = useState(true);
  const pageSize = 20; // Número de itens por página

  const STORAGE_KEY = "@clientes";

  const salvarClientesLocal = async (clientes) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
    } catch (e) {
      console.log("Erro ao salvar clientes localmente:", e);
    }
  };

  const carregarClientesLocal = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data !== null) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.log("Erro ao carregar clientes localmente:", e);
    }
    return [];
  };

  useEffect(() => {
    if (!token) {
      navigation.navigate("Login");
    }
  }, [token]);

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      const dadosLocais = await carregarClientesLocal();
      setClientes(dadosLocais);
      setList(dadosLocais);
    };
    carregarDadosIniciais();
  }, []);

  useEffect(() => {
    atualiza();
  }, [atualizaLista, route.params, token]);

  const iconePessoa = AntDesign;
  const iconeLixeira = Feather;

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
    let clientesLocais = await carregarClientesLocal();

    try {
      const response = await axios.delete(
        baseUrlClientes + data.id,
        configAxios
      );

      if (response.status === 200) {
        console.log("Remoção no servidor realizada.");
      }
    } catch (error) {
      console.log(
        "Falha ao excluir no servidor, excluindo apenas local:",
        error
      );
      Alert.alert(
        "Aviso",
        "Sem conexão com o servidor. Cliente removido apenas localmente."
      );
    } finally {
      // Sempre remove localmente, mesmo que falhe no servidor
      clientesLocais = clientesLocais.filter((item) => item.id !== data.id);
      await salvarClientesLocal(clientesLocais);

      // Atualiza a lista
      setPage(1);
      setPossuiElementos(true);
      setClientes([]);
      setList([]);
      setAtualizaLista((prev) => prev + 1);
      mostrarMensagemExcluido();
    }
  }, [data?.id, mostrarMensagemExcluido]);

  const atualiza = useCallback(
    async (ignorarPossuiElementos = false) => {
      if (!token) return;
      if (!ignorarPossuiElementos && !possuiElementos) return;

      let config = {
        headers: { Authorization: "Bearer " + token },
      };

      try {
        const response = await axios.get(
          baseUrlClientesPaginado(page, pageSize),
          config
        );

        if (response.status == 200) {
          const responseData = response.data.data;

          setList((antigo) => [
            ...antigo,
            ...responseData.filter(
              (novo) => !antigo.some((item) => item.id === novo.id)
            ),
          ]);
          setClientes((antigo) => [
            ...antigo,
            ...responseData.filter(
              (novo) => !antigo.some((item) => item.id === novo.id)
            ),
          ]);

          // Atualiza o AsyncStorage com o novo conjunto de dados
          const clientesLocais = await carregarClientesLocal();
          const novosDados = [
            ...clientesLocais.filter(
              (item) => !responseData.some((novo) => novo.id === item.id)
            ),
            ...responseData,
          ];
          await salvarClientesLocal(novosDados);

          if (responseData.length < pageSize) {
            setPossuiElementos(false);
          } else {
            setPage((prev) => prev + 1);
          }

          setExcluidoModalVisible(false);
          setAtualizaLista(0);
        }
      } catch (error) {
        console.log("Erro na requisição, carregando local:", error);

        const clientesLocais = await carregarClientesLocal();
        setClientes(clientesLocais);
        setList(clientesLocais);

        Alert.alert(
          "Aviso",
          "Sem conexão com o servidor. Carregado dados locais."
        );
      }
    },
    [token, page, possuiElementos, atualizaLista]
  );

  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  const filteredList = useMemo(() => {
    if (searchText === "") return clientes;
    return clientes.filter((item) =>
      item.attributes.nome.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, clientes]);

  const [ascendingOrder, setAscendingOrder] = useState(true);

  const ordenar = useCallback(() => {
    setList((prevList) => {
      const newList = [...prevList];
      newList.sort((a, b) => {
        const nomeA = a.attributes.nome.toLowerCase();
        const nomeB = b.attributes.nome.toLowerCase();
        return ascendingOrder
          ? nomeA.localeCompare(nomeB)
          : nomeB.localeCompare(nomeA);
      });
      return newList;
    });
    setAscendingOrder((prev) => !prev);
  }, [ascendingOrder]);

  const ItemListaClienteMemo = memo(ItemListaCliente);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ItemListaClienteMemo
          data={item}
          toggleModal={toggleModal}
          setData={setData}
          IconePessoa={iconePessoa}
          IconeLixeira={iconeLixeira}
        />
      );
    },
    [ItemListaClienteMemo, toggleModal, setData]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Clientes:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Busque aqui o cliente"
            placeholderTextColor="#015C92"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={ordenar} style={{}}>
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
            initialNumToRender={10}
            windowSize={10}
            onEndReached={atualiza}
            onEndReachedThreshold={0.5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            removeClippedSubviews={true}
            ListFooterComponent={renderEmptyItem}
          />
        ) : (
          <Text>Nenhum cliente encontrado!</Text>
        )}
      </View>
      <View style={[styles.button, styles.menu]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ClienteAdicionar")}
        >
          <FontAwesome6 name="add" size={28} color="#015C92" />
        </TouchableOpacity>
      </View>

      <View>
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
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={excluidoModalVisible2}
        onRequestClose={() => setExcluidoModalVisible2(false)}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Serviço concluido com sucesso!</Text>
            <TouchableOpacity
              style={styles.bot3}
              onPress={() => setExcluidoModalVisible2(false)}
            >
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Deseja excluir esse cliente?</Text>
              <View style={styles.bots}>
                <TouchableOpacity style={styles.bot} onPress={() => remover()}>
                  <Text style={styles.textbotao2}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
                  <Text style={styles.textbotao}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={excluidoModalVisible}
        onRequestClose={() => setExcluidoModalVisible(false)}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Serviço excluído com sucesso!</Text>
            <TouchableOpacity
              style={styles.bot3}
              onPress={() => {
                setExcluidoModalVisible(false);
                atualiza();
              }}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#88CDF6",
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
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
