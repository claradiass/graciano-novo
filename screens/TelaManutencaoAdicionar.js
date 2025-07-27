import { useState, useMemo } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns-tz";
import TelaManutencaoBase from "../components/TelaManutencaoFormBase";
import { listaOpcoes } from "../util/constantes";
import { ManutencaoService } from "../util/services/ManutencaoService";

export default function TelaManutencaoAdicionar({ route }) {
  const navigation = useNavigation();

  const clienteDados = route?.params ?? {};
  const attributes = clienteDados?.attributes ?? {};

  const [nome] = useState(attributes?.nome ?? "");
  const [telefone] = useState(attributes?.telefone ?? "");
  const [endereco] = useState(attributes?.endereco ?? "");
  const [cliente] = useState(clienteDados?.id ?? null);

  const [descricao, setDescricao] = useState("");
  const [valorTotal, setValorTotal] = useState("0.00");
  const [totalDespesas, setTotalDespesas] = useState("0.00");
  const [valorRecebido, setValorRecebido] = useState("0.00");

  const [itemSelecionado, setItemSelecionado] = useState(listaOpcoes[0]);
  const [showInput, setShowInput] = useState(false);
  const [nomeAparelhoManual, setNomeAparelhoManual] = useState("");

  const [dataFinalizado, setDataFinalizado] = useState(null);

  const dataIniciado = useMemo(() => {
    const agora = new Date();
    const data = format(agora, "yyyy-MM-dd", {
      timeZone: "America/Sao_Paulo",
    });
    const hora = format(agora, "HH:mm", {
      timeZone: "America/Sao_Paulo",
    });
    return `${data} ${hora}`;
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return format(data, "dd/MM/yyyy 'às' HH:mm", {
      timeZone: "America/Sao_Paulo",
    });
  };

  const formatarValor = (input, setStateFunction) => {
    const numeroLimpo = input.replace(/[^\d]/g, "");
    const numeroComZeros = numeroLimpo.padStart(3, "0");
    const inteiro = numeroComZeros.slice(0, -2);
    const decimal = numeroComZeros.slice(-2);
    const valorFormatado = `${parseInt(inteiro)}.${decimal}`;
    setStateFunction(valorFormatado);
  };

  const handlePickerChange = (itemValor) => {
    setItemSelecionado(itemValor);
    setShowInput(itemValor === "outros");
  };

  const adicionar = async () => {
    if (!itemSelecionado) {
      Alert.alert("Atenção", "Você precisa escolher um aparelho!");
      return;
    }

    if (!descricao.trim()) {
      Alert.alert("Atenção", "Informe a descrição do serviço.");
      return;
    }

    if (itemSelecionado === "outros" && !nomeAparelhoManual.trim()) {
      Alert.alert("Atenção", "Informe o nome do aparelho.");
      return;
    }

    const dados = {
      valorTotal,
      totalDespesas,
      valorRecebido,
      aparelho: itemSelecionado,
      descricao,
      outros: nomeAparelhoManual,
      dataIniciado,
      dataFinalizado,
      cliente,
    };

    try {
      await ManutencaoService.adicionarManutencao(dados);
      navigation.navigate("TelaManutencaoLista", { realizarAtualizacao: true });
    } catch (error) {
      console.error("Erro ao adicionar manutenção:", error);
      Alert.alert("Erro", "Não foi possível adicionar a manutenção.");
    }
  };

  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
    navigation.navigate("TelaClienteLista");
  };

  return (
    <TelaManutencaoBase
      tituloTela="Adicionar nova manutenção"
      nomeBotao="Adicionar Serviço"
      onPressBotao={adicionar}
      nome={nome}
      mostrarNome={true}
      mostrarConclusao={false}
      mostrarDataFinalizacao={false}
      dataIniciado={dataIniciado}
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
    />
  );
}
