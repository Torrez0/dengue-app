export type Denuncia = {
  id: string;
  endereco: string;
  cidade: string;
  estado: string;
  data: string;
  status: string;
};

export type DenunciaCardProps = {
  denuncia: Denuncia;
  onDelete: (id: string) => void; 
};
