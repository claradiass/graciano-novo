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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import axios from "axios";
import { configAxios, baseUrlAgendamentos } from "../util/constantes";

export default function TelaAgendamentoAdicionar({ route, navigation }) {
  const [clienteDados] = useState(route.params);
  const [nome] = useState(clienteDados.attributes.nome);
  const [telefone] = useState(clienteDados.attributes.telefone);
  const [endereco] = useState(clienteDados.attributes.endereco);
  const [data, setData] = useState("");
  const [dataDate, setDataDate] = useState(null);
  const [hora, setHora] = useState("");
  const [horaDate, setHoraDate] = useState(null);

  const [cliente] = useState(clienteDados.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirm = (date) => {
    hideDatePicker();
    if (date instanceof Date && !isNaN(date)) {
      const dataFormatada = format(date, "yyyy-MM-dd");
      setData(dataFormatada);
      setDataDate(date);
    } else {
      console.error("Data inválida recebida:", date);
    }
  };

  const handleTimeConfirm = (time) => {
    hideTimePicker();
    if (time instanceof Date && !isNaN(time)) {
      const horaFormatada = format(time, "HH:mm:ss");
      setHora(horaFormatada);
      setHoraDate(time);
    } else {
      console.error("Hora inválida recebida:", time);
    }
  };

  const toggleModal = () => setModalVisible(!modalVisible);

  const adicionar = () => {
    if (!data || !hora) {
      console.error("Data e hora são obrigatórias.");
      return;
    }

    const dados = { data: { data, hora, cliente } };

    axios
      .post(baseUrlAgendamentos, dados, configAxios)
      .then(() => {
        navigation.navigate("TelaAgenda", { realizarAtualizacao: true });
        route.params.realizarAtualizacao = false;
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
        if (error.response) {
          console.error("Dados da resposta:", error.response.data);
          console.error("Status do código:", error.response.status);
        }
      });
  };

  function formatarData(dataString) {
    if (typeof dataString !== "string" || !dataString.includes("-")) {
      return "Selecione uma data";
    }

    try {
      const [ano, mes, dia] = dataString.split("-").map(Number);

      if ([ano, mes, dia].some(isNaN)) return dataString;

      const dataObj = new Date(ano, mes - 1, dia);

      if (isNaN(dataObj.getTime())) return dataString;

      return format(dataObj, "dd/MM/yyyy");
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return dataString;
    }
  }

  return (
    <LinearGradient colors={["#88CDF6", "#2D82B5"]} style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.content}>
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Adicionar novo agendamento</Text>
          </View>
          <View style={styles.area}>
            <View>
              <Text style={styles.text2}>Nome do cliente:</Text>
              <TextInput style={styles.input} value={nome} editable={false} />
            </View>
            <View>
              <Text style={styles.text2}>Contato:</Text>
              <TextInput
                style={styles.input}
                value={telefone}
                editable={false}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Text style={styles.text2}>Endereço:</Text>
              <TextInput
                style={styles.input}
                value={endereco}
                editable={false}
              />
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              confirmText="Confirmar"
              cancelText="Cancelar"
              buttonTextColorIOS="#33cc33"
              locale="pt_BR"
              date={dataDate ?? new Date()}
            />

            <View>
              <Text style={styles.text2}>Data:</Text>
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.input2}>
                  {typeof data === "string" && data
                    ? formatarData(data)
                    : "Selecione uma data"}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.text2}>Hora:</Text>
              <TouchableOpacity onPress={showTimePicker}>
                <Text style={styles.input2}>
                  {hora ? hora.slice(0, 5) : "Selecione um horário"}
                </Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
              confirmText="Confirmar"
              cancelText="Cancelar"
              buttonTextColorIOS="#33cc33"
              locale="pt_BR"
              date={horaDate ?? new Date()}
            />
          </View>

          <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.7}
            onPress={adicionar}
          >
            <Text style={styles.textbotao}>Adicionar Agendamento</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
          >
            <StatusBar
              backgroundColor="rgba(0, 0, 0, 0.5)"
              translucent={true}
            />
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.textbotao}>
                  Agendamento adicionado com sucesso!
                </Text>
                <View style={styles.bots}>
                  <TouchableOpacity
                    style={styles.bot2}
                    onPress={() => {
                      toggleModal();
                      navigation.navigate("ClienteLista");
                    }}
                  >
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
  input2: {
    width: 320,
    height: 40,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    elevation: 4,
    marginTop: 20,
  },
  pickerContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  picker: {
    width: 320,
    height: 30,
    fontSize: 16,
    color: "#fff",
    borderWidth: 2,
    borderColor: "#fff",
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
