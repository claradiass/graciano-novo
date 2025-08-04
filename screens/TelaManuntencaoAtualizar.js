import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns-tz";
import TelaManutencaoBase from "../components/TelaManutencaoFormBase";
import { listaOpcoes } from "../util/constantes";
import { ManutencaoService } from "../util/services/ManutencaoService";

export default function TelaManutencaoAtualizar({ route }) {
  const navigation = useNavigation();
  const servico = route.params;

  console.log("Serviço recebido:", servico);

  const hoje = new Date();
  const dataHoje = format(hoje, "yyyy-MM-dd", {
    timeZone: "America/Sao_Paulo",
  });
  const horarioHoje = format(hoje, "HH:mm", { timeZone: "America/Sao_Paulo" });
  const dataHorarioHoje = `${dataHoje} ${horarioHoje}`;

  const [descricao, setDescricao] = useState(servico.attributes.descricao);
  const [valorTotal, setValorTotal] = useState(
    servico.attributes.valorTotal?.toString() ?? "0.00"
  );
  const [totalDespesas, setTotalDespesas] = useState(
    servico.attributes.totalDespesas?.toString() ?? "0.00"
  );
  const [valorRecebido, setValorRecebido] = useState(
    servico.attributes.valorRecebido?.toString() ?? "0.00"
  );

  const [dataIniciado, setDataIniciado] = useState(
    servico.attributes.dataIniciado
  );
  const [dataFinalizado, setDataFinalizado] = useState(null);
  const [itemSelecionado, setItemSelecionado] = useState(
    servico.attributes.aparelho ?? ""
  );
  const [nomeAparelhoManual, setNomeAparelhoManual] = useState(
    servico.attributes.outros ?? ""
  );
  const [showInput, setShowInput] = useState(
    servico.attributes.aparelho === "outros"
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [servicoConcluido, setServicoConcluido] = useState(false);

  const handlePickerChange = (itemValor) => {
    setItemSelecionado(itemValor);
    setShowInput(itemValor === "outros");
  };

  const toggleModal = () => setModalVisible((prev) => !prev);
  const toggleModal2 = () => {
    setModalVisible2((prev) => !prev);
    navigation.navigate("TelaClienteLista");
  };

  const concluirServico = () => {
    setDataFinalizado((prev) => (servicoConcluido ? null : dataHorarioHoje));
    setServicoConcluido((prev) => !prev);
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const formatarValor = (input, setStateFunction) => {
    const numeroLimpo = input.replace(/[^\d]/g, "");
    const numeroComZeros = numeroLimpo.padStart(3, "0");
    const inteiro = numeroComZeros.slice(0, -2);
    const decimal = numeroComZeros.slice(-2);
    setStateFunction(`${parseInt(inteiro)}.${decimal}`);
  };

  const atualizar = async () => {
    if (!itemSelecionado) {
      Alert.alert("Atenção", "Você precisa escolher um aparelho!");
      return;
    }

    const dados = {
      valorTotal,
      totalDespesas,
      valorRecebido,
      aparelho: itemSelecionado,
      outros: nomeAparelhoManual,
      descricao,
      dataIniciado,
      dataFinalizado,
    };
    
    //AQUI
    try {
      response = await ManutencaoService.atualizarManutencao(servico.id, dados);
      if(!response){
        navigation.navigate("Principal", { screen: "TelaManutencaoLista", params: {realizarAtualizacao: true} });
        return;
      }
      navigation.navigate("Principal", {
        screen: "TelaManutencaoLista",
        params: { realizarAtualizacao: true },
      });

    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o serviço.");
    }
  };

  return (
    <TelaManutencaoBase
      tituloTela="Atualizar manutenção"
      nomeBotao="Atualizar Serviço"
      onPressBotao={atualizar}
      mostrarNome={false}
      mostrarConclusao={true}
      mostrarDataFinalizacao={true}
      dataIniciado={dataIniciado}
      dataFinalizado={dataFinalizado}
      formatarData={formatarData}
      descricao={descricao}
      setDescricao={setDescricao}
      valorTotal={valorTotal}
      setValorTotal={(input) => formatarValor(input, setValorTotal)}
      totalDespesas={totalDespesas}
      setTotalDespesas={(input) => formatarValor(input, setTotalDespesas)}
      valorRecebido={valorRecebido}
      setValorRecebido={(input) => formatarValor(input, setValorRecebido)}
      itemSelecionado={itemSelecionado}
      setItemSelecionado={handlePickerChange}
      showInput={showInput}
      nomeAparelhoManual={nomeAparelhoManual}
      setNomeAparelhoManual={setNomeAparelhoManual}
      listaOpcoes={listaOpcoes}
      modalVisible={modalVisible}
      toggleModal={toggleModal}
      toggleModal2={toggleModal2}
      onConcluirServico={concluirServico}
      servicoConcluido={servicoConcluido}
    />
  );
}
