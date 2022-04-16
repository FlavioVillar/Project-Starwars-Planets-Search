const fetchPlanetAPI = async () => {
  const response = await fetch('https://swapi.dev/api/planets/?page=1&format=json');
  const data = await response.json();
  return data;
};

export default fetchPlanetAPI;
