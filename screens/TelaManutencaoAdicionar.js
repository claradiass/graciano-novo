import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns-tz';
import TelaManutencaoBase from '../components/TelaManutencaoFormBase';

import axios from 'axios';
import { 
  configAxios,
  baseUrlServicos,
  listaOpcoes
} from '../util/constantes';


export default function TelaManutencaoAdicionar({ route }) {
  const [clienteDados, setClienteDados] = useState(route.params);
  const [nome, setNome] = useState(clienteDados.attributes.nome);
  const [telefone, setTelefone] = useState(clienteDados.attributes.telefone);
  const [endereco, setEndereco] = useState(clienteDados.attributes.endereco);
  const [cliente, setIdCliente] = useState(clienteDados.id);

  const [nomeAparelhoManual, setNomeAparelhoManual] = useState("");
  const hoje = new Date();
  const dataHoje = format(hoje, 'yyyy-MM-dd', { timeZone: 'America/Sao_Paulo' });
  const horarioHoje = format(hoje, 'HH:mm', { timeZone: 'America/Sao_Paulo' });
  const dataHorarioHoje = `${dataHoje} ${horarioHoje}`;

  const [descricao, setDescricao] = useState("");
  const [valorTotal, setValorTotal] = useState("0");
  const [totalDespesas, setTotalDespesas] = useState("0");
  const [valorRecebido, setValorRecebido] = useState("0");
  const [aparelho, setAparelho] = useState("");
  const [outros, setOutros] = useState("");
  const [dataFinalizado, setDataFinalizado] = useState(null);
  const [dataIniciado, setDataIniciado] = useState(dataHorarioHoje);

  function formatarData(dataString) {
    const data = new Date(dataString);
    
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
  
    const dataFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    return dataFormatada;
  }
  const [realizarAtualizacao, setRealizarAtualizacao] = useState(false);

  function adicionar() {
    if (!itemSelecionado) {
      Alert.alert("Atenção", "Você precisa escolher um aparelho!")
      return;
    }
    const dados = {
      data: {
        valorTotal,
        totalDespesas,
        valorRecebido,
        aparelho: listaOpcoes.includes(itemSelecionado) ? itemSelecionado : "outros",
        descricao,
        outros: nomeAparelhoManual,
        dataIniciado,
        dataFinalizado,
        cliente
      },
    };

    axios.post(baseUrlServicos, dados, configAxios)
      .then(() => {
        setRealizarAtualizacao(true);
        navigation.navigate('TelaManutencaoLista', { realizarAtualizacao: true });
        
      })
      .catch(error => {
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Status code:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request failed:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });
  }

  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const navigation = useNavigation();

  const formatarValor = (input, setStateFunction) => {
    // Remove tudo que não for número
    const numeroLimpo = input.replace(/[^\d]/g, '');

    if (!numeroLimpo) {
      setStateFunction('0.00');
      return;
    }
    // Garante pelo menos 3 dígitos para evitar erros de slice
    const numeroComZeros = numeroLimpo.padStart(3, '0');
    const inteiro = numeroComZeros.slice(0, -2);
    const decimal = numeroComZeros.slice(-2);

    // Remove zeros à esquerda do inteiro, mas mantém pelo menos '0'
    const inteiroFormatado = String(Number(inteiro));

    const valorFormatado = `${inteiroFormatado}.${decimal}`;

    setStateFunction(valorFormatado);
  };

  const handlePickerChange = (itemValor) => {
    setItemSelecionado(itemValor);
    if (itemValor === 'outros') {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
  };

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
    navigation.navigate('ClienteLista');
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
  )
}