
class MarvelService {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    const result = await res.json();

    return result;
  }
}

export default MarvelService;
