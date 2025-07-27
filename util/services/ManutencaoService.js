import axios from "axios";
import { SyncManager } from "../sync/SyncManager";
import { baseUrlServicos, configAxios } from "../constantes";

export const ManutencaoService = {
  async adicionarManutencao(dados) {
    const requisicao = {
      method: "POST",
      url: baseUrlServicos,
      data: { data: dados },
      headers: configAxios.headers,
    };

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        console.log('adicionado com sucesso');
        return await axios(requisicao);
      } catch (error) {
        console.log("Erro ao adicionar, salvando na fila:", error);
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      console.log("Offline, adicionando requisição à fila.");
      await SyncManager.addToQueue(requisicao);
    }
  },

  async atualizarManutencao(manutencaoId, dados) {
    const requisicao = {
      method: "PUT",
      url: `${baseUrlServicos}${manutencaoId}`,
      data: { data: dados },
      headers: configAxios.headers,
    };

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        console.log('atualizado com sucesso');
        return await axios(requisicao);
      } catch (error) {
        console.log("Erro ao atualizar manutenção, adicionando à fila:", error);
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      console.log("Offline, adicionando atualização à fila.");
      await SyncManager.addToQueue(requisicao);
    }
  },

  async buscarManutencoes() {
    try {
      const response = await axios.get(
        `${baseUrlServicos}?populate=*`,
        configAxios
      );
      console.log('resgate com sucesso');
      return response.data.data;
    } catch (error) {
      console.error("Erro ao buscar manutenções:", error);
      throw error;
    }
  },

  async excluirManutencao(manutencaoId) {
    const requisicao = {
      method: "DELETE",
      url: `${baseUrlServicos}${manutencaoId}`,
      headers: configAxios.headers,
    };

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        console.log('removido com sucesso');
        return await axios(requisicao);
      } catch (error) {
        console.log("Erro ao excluir manutenção, adicionando à fila:", error);
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      console.log("Offline, adicionando exclusão à fila.");
      await SyncManager.addToQueue(requisicao);
    }
  },
};
