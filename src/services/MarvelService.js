class MarvelService {
  constructor() {
    this.apiBase = 'https://gateway.marvel.com:443/v1/public/';
    this.apiKey = 'apikey=54ee321803eeeb8fba1350ad85faa20c';
    this.baseOffset = 210;
  }

  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    const result = await res.json();

    return result;
  }

  async getAllCharacter(offset = this.baseOffset) {
    const res = await this.getResource(`${this.apiBase}characters?limit=9&offset=${offset}&${this.apiKey}`);
    return res.data.results.map(this.transformCharacter);
  }

  async getCharacter(id) {
    const res = await this.getResource(`${this.apiBase}characters/${id}?${this.apiKey}`);
    return this.transformCharacter(res.data.results[0]);
  }

  transformCharacter(char) {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  }
}

export default MarvelService;
