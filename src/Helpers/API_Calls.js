import axios from "axios"

export async function FetchCoin(uid, timePeriod) {
  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${uid}`,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchCoinPrice(uid, timePeriod) {
  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coin/${uid}/history`,
    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      timePeriod
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchDBData(uid, accessToken) {
  const options = {
    method: 'GET',
    url: `https://papercryptoapi.onrender.com/users/${uid}`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function CreateUserinDB(uid, First_Name, Last_Name, Email, Phone) {
  const options = {
    method: 'POST',
    url: `https://papercryptoapi.onrender.com/create_user`,
    params: {
      uid,
      First_Name,
      Last_Name,
      Email,
      Phone
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addMoneyDB(uid, amount) {
  const options = {
    method: 'POST',
    url: `https://papercryptoapi.onrender.com/add_balance`,
    params: {
      uid,
      amount
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function WithdrawMoney(uid, amount) {
  const options = {
    method: 'POST',
    url: `https://papercryptoapi.onrender.com/withdraw_money`,
    params: {
      uid,
      amount
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchBalance(uid) {
  const options = {
    method: 'POST',
    url: `https://papercryptoapi.onrender.com/users/${uid}/fetch_balance`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function BuyCryptoAPI(uid, token_id, amount) {
  const options = {
    method: 'POST',
    url: `https://papercryptoapi.onrender.com/users/${uid}/buy_crypto`,
    params: {
      token_id,
      amount
    }
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export async function FetchCryptoHoldings(uid) {
  const options = {
    method: 'GET',
    url: `https://papercryptoapi.onrender.com/users/${uid}/crypto_holdings`,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function FetchListOfCoins(symbol_list) {
  const listofSymbols = {}

  symbol_list.map((sym, i) => {
    listofSymbols[`symbols[${i}]`] = sym;
  })

  const options = {
    method: 'GET',
    url: `https://coinranking1.p.rapidapi.com/coins`,
    params: {
      'tiers[0]': '1',
      ...listofSymbols
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}