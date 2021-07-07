import axios from "axios";

class ZipcodeService {
  get = async (zipcode = "") => {
    const request = await axios.get(
      `https://viacep.com.br/ws/${zipcode}/json/`
    );
    return request.data;
  };
}

export default new ZipcodeService();
