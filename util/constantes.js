export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsImlhdCI6MTc1MzE0MjA3OCwiZXhwIjoxNzU1NzM0MDc4fQ.c8IhX9VaiEXDmjSCKX9KOENmfAyF2DSlglGElBvkNfc";

export const configAxios = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const baseUrl =
  "https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/";

export const baseUrlServicos = baseUrl + "graciano-servicos/";
export const baseUrlClientes = baseUrl + "graciano-clientes/";
export const baseUrlClientesPaginado = (page, pageSize) => {
  return (
    baseUrl +
    "graciano-clientes/" +
    `?pagination[start]=${(page - 1) * pageSize}&pagination[limit]=${pageSize}`
  );
};
export const baseUrlAgendamentos = baseUrl + "graciano-agendamentos/";

export const listaOpcoes = [
  { label: "Selecionar", value: "" },
  { label: "Ar-condicionado", value: "Ar-condicionado" },
  { label: "Geladeira", value: "Geladeira" },
  { label: "Freezer", value: "Freezer" },
  { label: "outros", value: "outros" },
];

export const STORAGE_KEY = "@fila_offline";
export const MANUTENCOES_CACHE_KEY = "@manutencao";
export const CLIENTES_CACHE_KEY = "@clientes";
