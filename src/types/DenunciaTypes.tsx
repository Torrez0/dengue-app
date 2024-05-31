export type Denuncia = {
  id: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  data: string;
  status: string;
};

export type DenunciaCardProps = {
  denuncia: Denuncia;
};
