export interface UsuarioDTO {
    nome: String;
	dataNascimento: String;
	cpf: String;
	sexo: String;
	email: String;
	tipoCampanha: String[];
	senha: String;
	ultimoLogin: string;
	perfis: number[];
}