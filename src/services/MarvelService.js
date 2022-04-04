class MarvelService {
  constructor() {
    this.apiBase = 'https://gateway.marvel.com:443/v1/public/';
    this.apiKey = 'apikey=54ee321803eeeb8fba1350ad85faa20c';
  }

  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    const result = await res.json();

    return result;
  }

  getAllCharacter() {
    return this.getResource(`${this.apiBase}characters?limit=9&offset=210&${this.apiKey}`);
  }

  getCharacter(id) {
    return this.getResource(`${this.apiBase}characters/${id}?${this.apiKey}`);
  }
}

export default MarvelService;
