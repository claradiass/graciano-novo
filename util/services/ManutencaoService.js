import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SyncManager } from "../sync/SyncManager";
import {
  baseUrlServicos,
  configAxios,
  MANUTENCOES_CACHE_KEY,
} from "../constantes";

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
        console.log("adicionado com sucesso");
        return await axios(requisicao);
      } catch (error) {
        console.log("Erro ao adicionar manutenção, salvando na fila:", error);
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
        console.log("manutenção atualizada com sucesso");
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
    const online = await SyncManager.isOnline();

    if (online) {
      try {
        const response = await axios.get(
          `${baseUrlServicos}?populate=*`,
          configAxios
        );
        console.log("resgate de manutenções realizado com sucesso");

        const dados = response.data.data;
        return dados;
      } catch (error) {
        console.error(
          "Erro ao buscar manutenções online. Tentando local:",
          error
        );
        return await this.carregarLocalmente();
      }
    } else {
      console.log("Offline - carregando manutenções do cache.");
      return await this.carregarLocalmente();
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
        console.log("manutenção removida com sucesso");
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

  async carregarLocalmente() {
    try {
      const data = await AsyncStorage.getItem(MANUTENCOES_CACHE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.log("Erro ao carregar manutenções localmente:", e);
      return [];
    }
  },
};
