
class MarvelService {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    const result = await res.json();

    return result;
  }

  getAllCharacter() {
    return this.getResource('https://gateway.marvel.com:443/v1/public/characters?apikey=54ee321803eeeb8fba1350ad85faa20c');
  }
}

export default MarvelService;
