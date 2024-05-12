import { useEffect, useState } from "react";
import Api from "../service/Api";
import exp from "constants";

const useSmartGarden = () => {
  const [dataSmartGarden, setDataSmartGarden] = useState<any>();
  useEffect(() => {
    const fecth = async () => {
      const api = new Api();
      api.url = "/smart-garden/smart-garden-by-date";
      const result = await api.call();
      console.log("respone", result);
      setDataSmartGarden(result);
    };
    fecth();
  }, []);
  return {
    dataSmartGarden,
  };
};

export { useSmartGarden };
