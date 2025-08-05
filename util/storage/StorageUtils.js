import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageUtils = {
  async salvar(chave, dados) {
    try {
      await AsyncStorage.setItem(chave, JSON.stringify(dados));
    } catch (e) {
      console.log(`Erro ao salvar [${chave}] localmente:`, e);
    }
  },

  async carregar(chave) {
    try {
      const data = await AsyncStorage.getItem(chave);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.log(`Erro ao carregar [${chave}] localmente:`, e);
      return [];
    }
  },
};
