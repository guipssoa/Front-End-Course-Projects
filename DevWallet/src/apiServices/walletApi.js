const API_REPLY = 'https://economia.awesomeapi.com.br/json/all';

const walletApi = async () => {
  const response = await fetch(API_REPLY);
  return response.json();
};

export default walletApi;
