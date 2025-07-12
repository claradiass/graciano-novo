import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns-tz';
import axios from 'axios';
import { configAxios, baseUrlServicos } from '../util/constantes';
import TelaManutencaoBase from '../components/TelaManutencaoFormBase';
import { listaOpcoes } from '../util/constantes';

export default function TelaManutencaoAtualizar({ route }) {
    const [servico, setServico] = useState(route.params);
    const [nomeAparelhoManual, setNomeAparelhoManual] = useState('');

    const hoje = new Date();
    const dataHoje = format(hoje, 'yyyy-MM-dd', {
        timeZone: 'America/Sao_Paulo',
    });
    const horarioHoje = format(hoje, 'HH:mm', { timeZone: 'America/Sao_Paulo' });
    const dataHorarioHoje = `${dataHoje} ${horarioHoje}`;

    const [descricao, setDescricao] = useState(servico.attributes.descricao);
    const [valorTotal, setValorTotal] = useState(servico.attributes.valorTotal);
    const [totalDespesas, setTotalDespesas] = useState(servico.attributes.totalDespesas);
    const [valorRecebido, setValorRecebido] = useState(servico.attributes.valorRecebido);
    const [aparelho, setAparelho] = useState(servico.attributes.aparelho);
    const [outros, setOutros] = useState(servico.attributes.outros);
    const [dataFinalizado, setDataFinalizado] = useState(null);
    const [dataIniciado, setDataIniciado] = useState(servico.attributes.dataIniciado);
    const [itemSelecionado, setItemSelecionado] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [servicoConcluido, setServicoConcluido] = useState(false);


    const navigation = useNavigation();

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

    const concluirServico = () => {
        const dataAtual = dataHorarioHoje;
        if (servicoConcluido) {
            setDataFinalizado(null);
        } else {
            setDataFinalizado(dataAtual);
        }
        setServicoConcluido((prevValue) => !prevValue);
    };


    function formatarData(dataString) {
        const dataISO = new Date(dataString);
        const dia = dataISO.getDate();
        const mes = (dataISO.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataISO.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        return dataFormatada;
    }

    const formatarValor = (input, setStateFunction) => {
        const numeroLimpo = input.replace(/[^\d]/g, '');
    
        let valorFormatado = '';
        if (numeroLimpo.length === 1) {
            valorFormatado = `.${numeroLimpo}`;
        } else if (numeroLimpo.length === 2) {
            valorFormatado = `.${numeroLimpo}`;
        } else {
            valorFormatado =
            `${numeroLimpo.slice(0, -2)}.${numeroLimpo.slice(-2)}`;
        }
    
        setStateFunction(valorFormatado);
    };

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

    axios
        .put(baseUrlServicos + servico.id, dados, configAxios)
        .then(() => {
            navigation.navigate('TelaManutencaoLista', {
            realizarAtualizacao: true,
            });
        })
        .catch((error) => {
            if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response data:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            console.error('Request failed:', error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            }
        });
    }

    return (
        <TelaManutencaoBase
          tituloTela="Atualizar manutenção"
          nomeBotao="Atualizar Serviço"
          onPressBotao={adicionar}
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
    )
}


















