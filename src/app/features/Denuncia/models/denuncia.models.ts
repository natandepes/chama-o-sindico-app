export enum StatusDenuncia {
    Pendente = 'Pendente',
    EmAndamento = 'Em Andamento',
    Resolvido = 'Resolvido'
  }
  
  export interface denunciaMock {
    Assunto: string;
    DataOcorrido: Date;
    DataResolvido: Date | undefined;
    Status: StatusDenuncia;
    Categoria: string;
    Descricao: string;
    Foto: string | undefined;
  }