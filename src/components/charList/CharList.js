import { Component } from 'react';
import propTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
  constructor() {
    super();
    this.marvelService = new MarvelService();
    this.state = {
      charList: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 210,
      charEnded: false,
    };

    this.focusOnItem = this.focusOnItem.bind(this);
  }

  componentDidMount() {
    this.onRequest();
  }

  onRequest(offset) {
    this.onCharListLoading();
    this.marvelService.getAllCharacter(offset)
      .then((res) => this.onCharListLoaded(res))
      .catch(() => this.onError());
  }

  onCharListLoading() {
    this.setState({
      newItemLoading: true,
    });
  }

  onCharListLoaded(newCharList) {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  }

  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }

  focusOnItem(id) {
    console.log(id);
  }

  renderItems() {
    const { onCharSelected } = this.props;
    const { charList } = this.state;
    const elements = charList.map((item) => (
      <li
        className="char__item"
        tabIndex={0}
        key={item.id}
        onClick={() => {
          onCharSelected(item.id);
          this.focusOnItem(item.id);
        }}
        aria-hidden="true"
      >
        <img
          src={item.thumbnail}
          alt="abyss"
          style={item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ? { objectFit: 'fill' } : null}
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
    const {
      error, loading, newItemLoading, offset, charEnded,
    } = this.state;

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
          disabled={newItemLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          onClick={() => this.onRequest(offset)}
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
