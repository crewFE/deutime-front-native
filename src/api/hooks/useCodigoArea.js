import { useState } from "react";
import ApiService from "../api";

export const useCodigoArea = () => {
  const [codigosArea, setCodigosArea] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // testado, funcionando
  const fetchCodigosArea = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/ddds");
      setCodigosArea(response.data.content);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // testado, funcionando
  const fetchCodigoAreaById = async (codigoArea) => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/ddds/${codigoArea}`);
      setCodigosArea([response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createCodigoArea = async (codigoArea) => {
    setLoading(true);
    try {
      const response = await ApiService.post("/ddds", { codigoArea });
      setCodigosArea((prevData) => [...prevData, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCodigoArea = async (codigoArea) => {
    setLoading(true);
    try {
      await ApiService.delete(`/ddds/${codigoArea}`);
      setCodigosArea((prevData) =>
        prevData.filter((ddd) => ddd.codigoArea !== codigoArea)
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    codigosArea,
    error,
    loading,
    fetchCodigosArea,
    fetchCodigoAreaById,
    createCodigoArea,
    deleteCodigoArea,
  };
};
