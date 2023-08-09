import { useState } from 'react';

function useFetch() {
  const [inLoad, setInLoad] = useState(false);

  const [setErrors] = useState(null);

  const makeFetch = async (url) => {
    try {
      setInLoad(true);
      const response = await fetch(url);
      if (!response) {
        const fetchError = new Error(
          `status: ${response.status}`,
        );
        fetchError.response = response;
        throw fetchError;
      }
      const responseJSON = response.json();
      return responseJSON;
    } catch (error) {
      setErrors(error);
    } finally {
      setInLoad(false);
    }
  };
  return {
    makeFetch, inLoad,
  };
}

export default useFetch;
