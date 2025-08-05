import axios from "axios";
import { Alert } from "react-native";
import { SyncManager } from "../sync/SyncManager";

export async function executarRequisicao(
  requisicao,
  { offlineMsg = null } = {}
) {
  const online = await SyncManager.isOnline();

  if (online) {
    try {
      console.log("Executando requisição:", requisicao);
      return await axios(requisicao);
    } catch (error) {
      console.error("Erro na requisição. Adicionando à fila:", error);
      await SyncManager.addToQueue(requisicao);
    }
  } else {
    if (offlineMsg) Alert.alert(offlineMsg);
    console.log("Offline. Adicionando requisição à fila.");
    await SyncManager.addToQueue(requisicao);
  }

  return null;
}
