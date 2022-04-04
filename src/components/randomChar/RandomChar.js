import { Component } from 'react';
import propTypes from 'prop-types';
import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.marvelService = new MarvelService();

    this.state = {
      char: {},
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.updateChar();
    // this.timerID = setInterval(this.updateChar, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onCharLoaded(char) {
    this.setState({ char, loading: false });
  }

  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }

  updateChar() {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then((res) => this.onCharLoaded(res))
      .catch(() => this.onError());
  }

  render() {
    const {
      char, loading, error,
    } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} loading={error} /> : null;
    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button
            className="button button__main"
            type="button"
            onClick={() => {
              this.setState({ loading: true });
              this.updateChar();
            }}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

function View({ char, error }) {
  const {
    name, description, thumbnail, homepage, wiki,
  } = char;

  return (
    <div className="randomchar__block">
      <img style={error ? { 'object-fit': 'contain' } : null} src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomChar;

View.propTypes = {
  char: propTypes.any,
  error: propTypes.bool,
};

View.defaultProps = {
  char: {},
  error: false,
};
