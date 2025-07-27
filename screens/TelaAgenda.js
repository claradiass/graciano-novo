import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Modal,
  StyleSheet,
} from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Card } from "react-native-paper";
import { configAxios, baseUrlAgendamentos } from "../util/constantes";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};

LocaleConfig.defaultLocale = "fr";

function generateEmptyDates(startDate, endDate) {
  const emptyDates = {};
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    emptyDates[formattedDate] = [];
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return emptyDates;
}

export default function TelaAgenda({ route }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date()); // Definir a data selecionada como o dia atual
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const calendarTheme = {
    calendarBackground: "#88CDF6",
    dayTextColor: "#FFF",
    todayTextColor: "#FFF",
    selectedDayBackgroundColor: "#015C92",
    selectedDayTextColor: "#88CDF6",
    dotColor: "#015C92",
    textSectionTitleColor: "#FFF",
    monthTextColor: "#FFF",
    agendaKnobColor: "#015C92", // Cor do botão para carregar mais eventos
    selectedDay: {
      backgroundColor: "#88CDF6", // Cor de fundo dos dias com eventos
      borderRadius: 0,
    },
    "stylesheet.calendar.main": {
      emptyDayContainer: {
        backgroundColor: "#f0f0f0", // Cor de fundo para dias sem serviços
      },
    },
  };

  function atualiza() {
    axios
      .get(baseUrlAgendamentos + "?populate=*", configAxios)
      .then(function (response) {
        if (response.status == 200) {
          setAgendamentos(response.data.data);
          setExcluidoModalVisible(false);
        }
      })
      .catch((error) => {
        alert("Erro", "Houve um erro na comunicação com o servidor!");
        console.log(error);
      });
  }

  function remover(id) {
    axios
      .delete(`${baseUrlAgendamentos}/${id}`, configAxios)
      .then(function (response) {
        if (response.status == 200) {
          setAtualizaLista((prev) => prev + 1);
          setExcluidoModalVisible(false);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao excluir agendamento!");
      });
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };

  const mostrarMensagemExcluido2 = () => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  };

  const renderEmptyItem = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FontAwesome
          name="calendar-times-o"
          color="#379BD8"
          size={30}
          style={{ alignSelf: "center" }}
        />
        <Text style={styles.text3}>
          Não há agendamentos para o dia selecionado!
        </Text>
      </View>
    );
  };

  const renderItem = (item) => {
    return (
      <View style={{ marginRight: 10, marginTop: 20 }}>
        <Card>
          <View style={{ marginBottom: 5, backgroundColor: "#015C92" }}>
            <Text style={styles.textbotao4}>
              Horário: {item.hora.slice(0, -7)}
            </Text>
          </View>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  color="#015C92"
                  size={50}
                  style={{ alignSelf: "center", marginRight: 10 }}
                />
                <View>
                  <View>
                    <Text style={styles.textbotao3}>Cliente: {item.name}</Text>
                    <Text style={styles.textbotao3}>
                      Telefone: {item.telefone}
                    </Text>
                    <Text style={styles.textbotao3}>
                      Endereço: {item.endereco}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setData(item);
                    toggleModal();
                  }}
                >
                  <Feather
                    name="trash-2"
                    color="#015C92"
                    size={25}
                    style={{ alignSelf: "center" }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("TelaAgendamentoAtualizar", {
                      dados: item,
                    })
                  }
                >
                  <Feather
                    name="edit"
                    color="#015C92"
                    size={25}
                    style={{ alignSelf: "center", marginTop: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  useEffect(() => {
    if (route.params?.realizarAtualizacao) {
      atualiza();
      navigation.setParams({ realizarAtualizacao: false });
    }
  }, [route.params?.realizarAtualizacao]);

  useEffect(() => {
    atualiza();
  }, [atualizaLista]);

  useEffect(() => {
    const newItems = {}; //generateEmptyDates(startDate, endDate);

    agendamentos.forEach((item) => {
      const date = item.attributes.data; // Supondo que "data" seja a data no formato 'YYYY-MM-DD'

      if (!newItems[date]) {
        newItems[date] = [];
      }
      newItems[date].push({
        id: `${item.id}`,
        name: `${
          item.attributes.cliente?.data?.attributes?.nome ||
          "Cliente Desconhecido"
        }`,
        hora: `${item.attributes.hora}`,
        data: `${item.attributes.data}`,
        idCliente: `${
          item.attributes.cliente?.data?.id || "Cliente Desconhecido"
        }`,
        telefone: `${
          item.attributes.cliente?.data?.attributes?.telefone ||
          "Cliente Desconhecido"
        }`,
        endereco: `${
          item.attributes.cliente?.data?.attributes?.endereco ||
          "Cliente Desconhecido"
        }`,
      });
    });

    setItems(newItems);
  }, [agendamentos]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.detalhe}>
        <Text style={styles.text1}>Agenda</Text>
      </View>
      <Agenda
        items={items}
        renderEmptyData={renderEmptyItem}
        renderItem={renderItem}
        theme={calendarTheme}
        selected={selectedDate}
      />
      <View style={{ height: 70 }} />

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
              <Text style={styles.textbotao}>
                Deseja excluir esse Agendamento?
              </Text>
              <View style={styles.bots}>
                <TouchableOpacity
                  style={styles.bot}
                  onPress={() => remover(data.id)}
                >
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
            <Text style={styles.textbotao}>
              Agendamento excluído com sucesso!
            </Text>
            <TouchableOpacity
              style={styles.bot3}
              onPress={() => setExcluidoModalVisible(false)}
            >
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textbotao: {
    fontSize: 14,
    color: "white",
    fontFamily: "Urbanist_900Black",
    textAlign: "center",
  },

  textbotao2: {
    fontSize: 14,
    color: "#379BD8",
    fontFamily: "Urbanist_900Black",
    textAlign: "center",
  },

  textbotao3: {
    fontSize: 14,
    color: "#053F5C",
    fontFamily: "Urbanist_900Black",
  },

  textbotao4: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: "Urbanist_900Black",
    textAlign: "center",
    marginBottom: 5,
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
  detalhe: {
    backgroundColor: "#88CDF6",
    posistion: "absolute",
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: "Urbanist_900Black",
    color: "#FFF",
    marginTop: 20,
  },
  text3: {
    fontSize: 16,
    fontFamily: "Urbanist_900Black",
    color: "#379BD8",
    marginTop: 5,
  },
  emptyItem: {
    height: 2000,
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
    borderColor: "#FFF",
    borderWidth: 2,
  },
  menu: {
    backgroundColor: "#88CDF6",
    borderColor: "#FFF",
    borderWidth: 2,
  },
});
