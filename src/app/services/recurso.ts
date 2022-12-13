export interface Recurso {
  recursoID: number;
  nome: string;
  quantidadeTotal: number;
  recursoObrigatorioID: number;
  quantidadeDisponivel: number;
  quantidadeUso: number;
  quantidadeSeleccionada: number;
  nomeRecursoObrigatorio: string;
}
