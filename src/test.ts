const baseUrl = 'http://localhost:3000';

const query = '/planets/?surface_water=0&limit=1&offset=4&diameter=123';

const url = new URL(query, baseUrl);

const array: Array<any> = [];

url.searchParams.forEach((key, value) => {
  array.push(value + '=' + key);
});

console.log(array.sort().join('&'));
