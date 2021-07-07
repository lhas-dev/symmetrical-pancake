import axios from "axios";

class StatesService {
  getAll = async () => {
    const request = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    );
    return request.data;
  };
}

export default new StatesService();
