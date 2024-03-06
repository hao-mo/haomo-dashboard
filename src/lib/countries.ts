import countryData from 'world_countries_lists/data/countries/zh-tw/world.json';

export const countries = countryData.map((country) => ({
  name: country.name,
  value: country.alpha2,
}));

export const searchCountry = (query: { id?: number; alpha2?: string; alpha3?: string }) => {
  // if argument is not valid return false
  if (undefined === query.id && undefined === query.alpha2 && undefined === query.alpha3)
    return undefined;

  // iterate over the array of countries
  const targetCountry = countryData
    .filter(function (country) {
      // return country's data if
      return (
        // we are searching by ID and we have a match
        (undefined !== query.id && country.id === query.id) ||
        // or we are searching by alpha2 and we have a match
        (undefined !== query.alpha2 && country.alpha2 === query.alpha2.toLowerCase()) ||
        // or we are searching by alpha3 and we have a match
        (undefined !== query.alpha3 && country.alpha3 === query.alpha3.toLowerCase())
      );

      // since "filter" returns an array we use pop to get just the data object
    })
    .pop();

  return {
    name: targetCountry?.name,
    value: targetCountry?.alpha2,
  };
};
