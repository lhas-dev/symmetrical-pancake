import axios from "axios";

class CitiesService {
  getAll = async (ufId: number) => {
    const request = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`
    );
    return request.data;
  };
}

export default new CitiesService();
