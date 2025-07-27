import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SyncManager } from "../sync/SyncManager";
import {
  baseUrlClientes,
  baseUrlServicos,
  baseUrlClientesPaginado,
  configAxios,
} from "../constantes";

const CACHE_KEY = "@clientes";

export const ClienteService = {
  async adicionarCliente(dados) {
    const requisicao = {
      method: "POST",
      url: baseUrlClientes,
      data: { data: dados },
      headers: configAxios.headers,
    };

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        console.log('adicionado com sucesso');
        return await axios(requisicao);
      } catch (error) {
        console.log("Erro ao enviar, adicionando à fila:", error);
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      console.log("Offline, adicionando à fila.");
      await SyncManager.addToQueue(requisicao);
    }
  },

  async atualizarCliente(clienteId, dados) {
    const requisicao = {
      method: "PUT",
      url: baseUrlClientes + clienteId,
      data: { data: dados },
      headers: configAxios.headers,
    };

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        console.log('atualizado com sucesso');
        return await axios(requisicao);
      } catch (error) {
        console.log("Erro ao atualizar online, adicionando à fila:", error);
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      console.log("Offline, atualizando localmente e adicionando à fila.");
      await SyncManager.addToQueue(requisicao);
    }
  },

  async removerCliente(clienteId) {
    const requisicao = {
      method: "DELETE",
      url: baseUrlClientes + clienteId,
      headers: configAxios.headers,
    };

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        console.log('removido com sucesso');
        await axios(requisicao);
      } catch (error) {
        console.log("Erro ao remover online, adicionando à fila:", error);
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      console.log("Offline, removendo localmente e adicionando à fila.");
      await SyncManager.addToQueue(requisicao);
    }

    const locais = await ClienteService.carregarLocalmente();
    const atualizados = locais.filter((item) => item.id !== clienteId);
    await ClienteService.salvarLocalmente(atualizados);
  },

  async buscarClientesPaginado(page, pageSize, token) {
    const url = baseUrlClientesPaginado(page, pageSize);
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      console.log('resgate com sucesso');
      const response = await axios.get(url, headers);

      if (response.status === 200) {
        const novos = response.data.data;

        const locais = await ClienteService.carregarLocalmente();
        const atualizados = [
          ...locais.filter((item) => !novos.some((n) => n.id === item.id)),
          ...novos,
        ];

        await ClienteService.salvarLocalmente(atualizados);
        return { clientes: novos, locais: atualizados };
      }
    } catch (e) {
      console.log("Erro ao buscar clientes. Retornando local:", e);
      const locais = await ClienteService.carregarLocalmente();
      return { clientes: locais, locais };
    }
  },

  async salvarLocalmente(clientes) {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(clientes));
    } catch (e) {
      console.log("Erro ao salvar clientes localmente:", e);
    }
  },

  async carregarLocalmente() {
    try {
      const data = await AsyncStorage.getItem(CACHE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.log("Erro ao carregar clientes localmente:", e);
      return [];
    }
  },

  async buscarPorClienteId(clienteId) {
    const requisicao = {
      method: "GET",
      url: `${baseUrlServicos}?filters[cliente][id][$eq]=${clienteId}&populate=*`,
      headers: configAxios.headers,
    };

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        console.log('resgate por id com sucesso');
        const response = await axios(requisicao);
        return response.data.data;
      } catch (error) {
        console.log("Erro ao buscar serviços do cliente:", error);
        return [];
      }
    } else {
      console.log("Offline - retornando lista vazia para cliente.");
      return []; // ou carregar cache se tiver essa lógica
    }
  },
};
