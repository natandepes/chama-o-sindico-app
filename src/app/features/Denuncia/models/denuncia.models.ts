export enum StatusDenuncia {
    Pendente = 'Pendente',
    EmAndamento = 'Em Andamento',
    Resolvido = 'Resolvido'
  }
  
  export interface complaintMock {
    Id: number | undefined ;
    Assunto: string;
    DataOcorrido: Date;
    DataResolvido: Date | undefined;
    Status: StatusDenuncia;
    Categoria: string;
    Descricao: string;
    Foto: string | undefined;
  }