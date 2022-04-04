import { Component } from 'react';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
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
    console.log(characters);
    return (
      <div className="char__list">
        <ul className="char__grid">
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
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
