import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { STORAGE_KEY } from "../constantes";

export class SyncManager {
  static async addToQueue(requisicao) {
    const fila = await this.getQueue();
    fila.push(requisicao);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fila));
  }

  static async getQueue() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.log("Erro ao recuperar fila offline:", e);
      return [];
    }
  }

  static async syncQueue() {
    const fila = await this.getQueue();
    const novaFila = [];

    console.log("Fila atual:", JSON.stringify(fila, null, 2));

    for (const req of fila) {
      try {
        const response = await axios(req);

        if (!(response?.status >= 200 && response?.status < 300)) {
          throw new Error("Resposta não OK");
        }
      } catch (e) {
        console.log("Erro ao sincronizar requisição:", e);
        novaFila.push(req);
      }
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaFila));
  }

  static iniciarMonitoramento() {
    NetInfo.addEventListener(async (state) => {
      if (state.isConnected && state.isInternetReachable) {
        console.log(
          "Conexão detectada. Sincronizando fila e atualizando cache..."
        );
        this.syncQueue();
        // await pullData(TOKEN);
      }
    });
  }

  static async isOnline() {
    const state = await NetInfo.fetch();
    return state.isConnected && state.isInternetReachable;
  }
}
