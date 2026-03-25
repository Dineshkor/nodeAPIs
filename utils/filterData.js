export function filterData(destinations, queryObj) {
  const {country, continent, is_open_to_public} = queryObj;
  if(country) {
    destinations = destinations.filter((d) => d.country.toLowerCase() === country.toLowerCase());
  }
  if(continent) {
    destinations = destinations.filter((d) => d.continent.toLowerCase() === continent.toLowerCase());
  }
  if(is_open_to_public) {
    destinations = destinations.filter((d) => d.is_open_to_public === JSON.parse(is_open_to_public));
  }
  return destinations;
}
  
