import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClienteService } from "../services/ClienteService";
import { ManutencaoService } from "../services/ManutencaoService";
import { MANUTENCOES_CACHE_KEY, CLIENTES_CACHE_KEY } from "../constantes";

export async function pullData(token) {
  try {
    console.log("Fazendo pull de dados para cache...");

    const page = 1;
    const pageSize = 50;

    const { clientes } = await ClienteService.buscarClientesPaginado(
      page,
      pageSize,
      token
    );

    if (clientes?.length) {
      await AsyncStorage.setItem(CLIENTES_CACHE_KEY, JSON.stringify(clientes));
      console.log(
        "Clientes atualizados no cache:",
        clientes.length
      );
    }

    const manutencoes = await ManutencaoService.buscarManutencoes();
    if (manutencoes?.length > 0) {
      await AsyncStorage.setItem(
        MANUTENCOES_CACHE_KEY,
        JSON.stringify(manutencoes)
      );
      console.log("Manutenções atualizadas no cache:", manutencoes.length);
    }
  } catch (e) {
    console.log("Erro ao puxar dados para o cache:", e);
  }
}
