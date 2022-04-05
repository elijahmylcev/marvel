import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';

// char__item_selected ---> active class

class CharList extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    this.request = new MarvelService();
    this.getCharacters();
  }

  getCharacters() {
    const { characters } = this.state;
    this.request.getAllCharacter()
      .then((res) => {
        const newArray = characters.concat(res);
        this.setState({
          characters: newArray,
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    const { characters } = this.state;
    const elements = characters.map((item) => (
      <li className="char__item" key={item.name}>
        <img
          src={item.thumbnail}
          alt="abyss"
          style={item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? { objectFit: 'contain' } : null}
        />
        <div className="char__name">{item.name}</div>
      </li>
    ));
    return (
      <div className="char__list">
        <ul className="char__grid">
          {elements}
        </ul>
        <button
          className="button button__main button__long"
          type="button"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
