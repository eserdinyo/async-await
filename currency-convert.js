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

getExchangeRate('USD', 'TRY').then(rate => {
  console.log(rate);
})

getCountries('USD').then(countries => {
  console.log(countries);
})
