export const configAxios = {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTc0OTQzMTQ3NywiZXhwIjoxNzUyMDIzNDc3fQ.1nTPt9uLyxR9pYnsThF8Gmfrf8BmoIXke0VVNU95KYA',
    },
};

export const baseUrl = 'https://ideacao-backend-8ea0b764c21a.herokuapp.com/api/';

export const baseUrlServicos = baseUrl + 'graciano-servicos/';
export const baseUrlClientes = baseUrl + 'graciano-clientes/';
export const baseUrlClientesPaginado = (page, pageSize) => {
    return baseUrl + 'graciano-clientes/' + `?pagination[start]=${(page-1)*pageSize}&pagination[limit]=${pageSize}`
};
export const baseUrlAgendamentos = baseUrl + 'graciano-agendamentos/';

export const listaOpcoes = [
  {label: 'Selecionar', value: ''},
  {label: 'Ar-condicionado', value: 'Ar-condicionado'},
  {label: 'Geladeira', value: 'Geladeira'},
  {label: 'Freezer', value: 'Freezer'},
  {label: 'outros', value: 'outros'},
];