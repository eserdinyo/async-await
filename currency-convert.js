const axios = require('axios');

const currencyUrl = 'http://data.fixer.io/api/latest?access_key=c805b1275acec82f7a2a6b5ff3957b89';
const contriesURL = 'https://restcountries.eu/rest/v2/currency'

/* const getExchangeRate = (from, to) => {
  return axios.get(currencyUrl).then((res) => {
    const euro = 1 / res.data.rates[from];
    const rate = euro * res.data.rates[to];

    return rate.toFixed(2);
  })
} */

// async await
const getExchangeRate = async (from, to) => {

  const res = await axios.get(currencyUrl);

  const euro = 1 / res.data.rates[from];
  const rate = euro * res.data.rates[to];

  return rate.toFixed(2);
}


/* const getCountries = (currCode) => {
  return axios.get(`${contriesURL}/${currCode}`).then(res => {
    return res.data.map(country => country.name);
  })
}; */

// async await
const getCountries = async currCode => {
  const res = await axios.get(`${contriesURL}/${currCode}`);
  return res.data.map(country => country.name);
}


/* const convertCurrency = (from, to, amount) => {
  let convertedAmount;
  return getExchangeRate(from, to).then(rate => {
    convertedAmount = (amount * rate).toFixed(2);
    return getCountries(to);
  }).then((countries) => {
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following coumtries: ${countries.join(', ')}`
  })
} */

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * rate).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following coumtries: ${countries.join(', ')}`
}

convertCurrency('USD', 'EUR', 5).then((message) => {
  console.log(message);
})