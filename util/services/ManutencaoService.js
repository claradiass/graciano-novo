import axios from "axios";
import { SyncManager } from "../sync/SyncManager";
import {
  baseUrlServicos,
  baseUrlServicosPaginado,
  configAxios,
  MANUTENCOES_CACHE_KEY,
} from "../constantes";
import { executarRequisicao } from "../storage/RequestUtils";
import { StorageUtils } from "../storage/StorageUtils";

export const ManutencaoService = {
  async adicionarManutencao(dados) {
    const requisicao = {
      method: "POST",
      url: baseUrlServicos,
      data: { data: dados },
      headers: configAxios.headers,
    };

    return await executarRequisicao(requisicao, {
      offlineMsg: "Serviço não pode ser adicionado offline.",
    });
  },

  async atualizarManutencao(manutencaoId, dados) {
    const requisicao = {
      method: "PUT",
      url: `${baseUrlServicos}${manutencaoId}`,
      data: { data: dados },
      headers: configAxios.headers,
    };

    return await executarRequisicao(requisicao, {
      offlineMsg: "Serviço não pode ser atualizado offline.",
    });
  },

  async excluirManutencao(manutencaoId) {
    const requisicao = {
      method: "DELETE",
      url: `${baseUrlServicos}${manutencaoId}`,
      headers: configAxios.headers,
    };

    return await executarRequisicao(requisicao, {
      offlineMsg: "Serviço não pode ser excluído offline.",
    });
  },

  async buscarManutencoes(page, pageSize, token) {
    const url = baseUrlServicosPaginado(page, pageSize);
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        const response = await axios.get(url, headers);

        console.log("Manutenções recebidas:", response.data.data);
        return response.data.data;
      } catch (error) {
        console.error("Erro ao buscar manutenções online:", error);
        return await StorageUtils.carregar(MANUTENCOES_CACHE_KEY);
      }
    } else {
      console.log("Offline. Buscando manutenções localmente.");
      return await StorageUtils.carregar(MANUTENCOES_CACHE_KEY);
    }
  },
};
