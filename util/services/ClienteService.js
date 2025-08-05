import axios from "axios";
import { Alert } from "react-native";
import { SyncManager } from "../sync/SyncManager";
import {
  baseUrlClientes,
  baseUrlServicos,
  baseUrlClientesPaginado,
  configAxios,
  CLIENTES_CACHE_KEY,
} from "../constantes";
import { executarRequisicao } from "../storage/RequestUtils";
import { StorageUtils } from "../storage/StorageUtils";

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
      return await executarRequisicao(requisicao, {
        offlineMsg: "Você está sem conexão. Cliente será adicionado à fila.",
      });
    } else {
      Alert.alert("Você está sem conexão, cliente adicionado offline.");
      console.log(
        "Offline, adicionando requisição à fila e salvando no cache local."
      );
      await SyncManager.addToQueue(requisicao);

      try {
        const locais = await StorageUtils.carregar(CLIENTES_CACHE_KEY);
        const clienteTemp = {
          id: `temp-${Date.now()}`,
          attributes: dados,
        };

        const existe = locais.some((c) => c.id === clienteTemp.id);
        if (!existe) {
          locais.push(clienteTemp);
          await StorageUtils.salvar(CLIENTES_CACHE_KEY, locais);
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

    return await executarRequisicao(requisicao, {
      offlineMsg: "Cliente não pode ser atualizado offline.",
    });
  },

  async removerCliente(clienteId) {
    const requisicao = {
      method: "DELETE",
      url: baseUrlClientes + clienteId,
      headers: configAxios.headers,
    };

    await executarRequisicao(requisicao, {
      offlineMsg: "Cliente não pode ser excluído offline.",
    });

    const locais = await StorageUtils.carregar(CLIENTES_CACHE_KEY);
    const atualizados = locais.filter((item) => item.id !== clienteId);
    await StorageUtils.salvar(CLIENTES_CACHE_KEY, atualizados);
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
          const locais = await StorageUtils.carregar(CLIENTES_CACHE_KEY);

          const atualizados = [
            ...locais.filter((item) => !novos.some((n) => n.id === item.id)),
            ...novos,
          ];

          await StorageUtils.salvar(CLIENTES_CACHE_KEY, atualizados);
          return { clientes: novos, locais: atualizados };
        }
      } catch (e) {
        console.log("Erro ao buscar clientes online. Tentando local:", e);
        const locais = await StorageUtils.carregar(CLIENTES_CACHE_KEY);
        return { clientes: locais, locais };
      }
    } else {
      console.log("Offline - carregando clientes do cache.");
      const locais = await StorageUtils.carregar(CLIENTES_CACHE_KEY);
      return { clientes: locais, locais };
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
      Alert.alert("Você está offline. Conecte-se com a internet.");
      console.log("Offline - retornando lista vazia para cliente.");
      return [];
    }
  },
};
