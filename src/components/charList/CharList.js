import { Component } from 'react';
import propTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

// char__item_selected ---> active class

class CharList extends Component {
  constructor() {
    super();
    this.request = new MarvelService();
    this.state = {
      characters: [],
      loading: true,
      error: false,

    };
  }

  componentDidMount() {
    this.getCharacters();
  }

  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }

  getCharacters() {
    const { characters } = this.state;
    this.request.getAllCharacter()
      .then((res) => {
        const newArray = characters.concat(res);
        this.setState({
          characters: newArray,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  renderItems() {
    const { onCharSelected } = this.props;
    const { characters } = this.state;
    const elements = characters.map((item) => (
      <li
        className="char__item"
        key={item.id}
        onClick={() => onCharSelected(item.id)}
        aria-hidden="true"
      >
        <img
          src={item.thumbnail}
          alt="abyss"
          style={item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? { objectFit: 'fill' } : null}
        />
        <div className="char__name">{item.name}</div>
      </li>
    ));

    return (
      <ul className="char__grid">
        {elements}
      </ul>
    );
  }

  render() {
    const { error, loading } = this.state;

    const items = this.renderItems();

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
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

CharList.propTypes = {
  onCharSelected: propTypes.func.isRequired,
};

export default CharList;
