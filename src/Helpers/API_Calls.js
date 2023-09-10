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