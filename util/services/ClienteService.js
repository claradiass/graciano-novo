import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SyncManager } from "../sync/SyncManager";
import {Alert} from 'react-native';
import {
  baseUrlClientes,
  baseUrlServicos,
  baseUrlClientesPaginado,
  configAxios,
  CLIENTES_CACHE_KEY,
} from "../constantes";

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
        console.log("cliente adicionado com sucesso");
        return await axios(requisicao);
      } catch (error) {
        console.log("Erro ao enviar, adicionando requisição à fila:", error);
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      Alert.alert("Você está sem conexão, cliente adicionado offline.");
      console.log(
        "Offline, adicionando requisição à fila e salvando no cache local."
      );

      await SyncManager.addToQueue(requisicao);

      try {
        const locais = await this.carregarLocalmente();

        const clienteTemp = {
          id: `temp-${Date.now()}`,
          attributes: dados,
        };

        const existe = locais.some((c) => c.id === clienteTemp.id);
        if (!existe) {
          locais.push(clienteTemp);
          await this.salvarLocalmente(locais);
        }
      } catch (e) {
        console.log("Erro ao salvar cliente localmente offline:", e);
      }
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
        console.log("cliente atualizado com sucesso");
        return await axios(requisicao);
      } catch (error) {
        console.log(
          "Erro ao atualizar cliente online, adicionando à fila:",
          error
        );
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      console.log(
        "Offline, atualizando cliente localmente e adicionando à fila."
      );

      await SyncManager.addToQueue(requisicao);
      Alert.alert("Cliente não pode ser atualizado offline.")
      return null;
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
        console.log("cliente removido com sucesso");
        await axios(requisicao);
      } catch (error) {
        console.log(
          "Erro ao remover cliente online, adicionando à fila:",
          error
        );
        await SyncManager.addToQueue(requisicao);
      }
    } else {
      console.log(
        "Offline, removendo cliente localmente e adicionando à fila."
      );
      await SyncManager.addToQueue(requisicao);
      
      Alert.alert("Cliente não pode ser excluído offline.")
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

    const online = await SyncManager.isOnline();

    if (online) {
      try {
        console.log("resgate de clientes realizado com sucesso");
        const response = await axios.get(url, headers);

        if (response.status === 200) {
          const novos = response.data.data;

          const locais = await this.carregarLocalmente();
          const atualizados = [
            ...locais.filter((item) => !novos.some((n) => n.id === item.id)),
            ...novos,
          ];

          await this.salvarLocalmente(atualizados);
          return { clientes: novos, locais: atualizados };
        }
      } catch (e) {
        console.log("Erro ao buscar clientes online. Tentando local:", e);
        const locais = await this.carregarLocalmente();
        return { clientes: locais, locais };
      }
    } else {
      console.log("Offline - carregando clientes do cache.");
      const locais = await this.carregarLocalmente();
      return { clientes: locais, locais };
    }
  },

  async salvarLocalmente(clientes) {
    try {
      await AsyncStorage.setItem(CLIENTES_CACHE_KEY, JSON.stringify(clientes));
    } catch (e) {
      console.log("Erro ao salvar clientes localmente:", e);
    }
  },

  async carregarLocalmente() {
    try {
      const data = await AsyncStorage.getItem(CLIENTES_CACHE_KEY);
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
        console.log("resgate de cliente por id com sucesso");
        const response = await axios(requisicao);
        return response.data.data;
      } catch (error) {
        console.log("Erro ao buscar serviços do cliente:", error);
        return [];
      }
    } else {
      Alert,alert("Você está offline. Conecte-se com a internet.")
      console.log("Offline - retornando lista vazia para cliente.");
      return [];
    }
  },
};
