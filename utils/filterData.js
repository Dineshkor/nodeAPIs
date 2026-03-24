export function filterData(destinations, locationType, location) {
  return destinations.filter(
    (d) => d[locationType].toLowerCase() === location.toLowerCase()
  );
}
