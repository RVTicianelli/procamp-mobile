export interface CampanhaDTO {
    id: string;
    nome: string;
    dataInicio: String;
    dataFim: String;
    responsavel: String;
    tipoCamapanha: String;
    descricao: String;
    localidades: String[];
    preferencias: String[];
}