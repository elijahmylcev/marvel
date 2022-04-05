import { Component } from 'react';
import propTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
  constructor(props) {
    super(props);
    this.request = new MarvelService();

    this.state = {
      char: null,
      loading: false,
      error: false,
    };
    this.onCharLoaded = this.onCharLoaded.bind(this);
    this.onError = this.onError.bind(this);
    this.updateChar = this.updateChar.bind(this);
    this.onCharLoading = this.onCharLoading.bind(this);
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    const { charId } = this.props;
    if (charId !== prevProps.charId) {
      this.updateChar();
    }
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

  onCharLoading() {
    this.setState({
      loading: true,
    });
  }

  updateChar() {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();
    this.request.getCharacter(charId)
      .then((res) => this.onCharLoaded(res))
      .catch(() => this.onError);
  }

  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

function View({ char }) {
  const {
    name, description, thumbnail, homepage, wiki, comics,
  } = char;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="abyss" />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {
        comics.map((item, i) => (
          <li key={i + 1} className="char__comics-item">
            {item.name}
          </li>
        ))
      }

      </ul>
    </>
  );
}

View.propTypes = {
  char: propTypes.object.isRequired,
};

CharInfo.propTypes = {
  charId: propTypes.number,
};

CharInfo.defaultProps = {
  charId: null,
};

export default CharInfo;
