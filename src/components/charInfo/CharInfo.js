import { Component } from 'react';
import propTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
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
  return (
    <>
      <div className="char__basics">
        <img src={thor} alt="abyss" />
        <div>
          <div className="char__info-name">thor</div>
          <div className="char__btns">
            <a href="/" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href="/" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        descr
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        <li className="char__comics-item">
          All-Winners Squad: Band of Heroes (2011) #/3
        </li>
        <li className="char__comics-item">
          Alpha Flight (1983) #/50
        </li>
        <li className="char__comics-item">
          Amazing Spider-Man (1999) #/503
        </li>
        <li className="char__comics-item">
          Amazing Spider-Man (1999) #/504
        </li>
        <li className="char__comics-item">
          AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
        </li>
        <li className="char__comics-item">
          Vengeance (2011) #/4
        </li>
        <li className="char__comics-item">
          Avengers (1963) #/1
        </li>
        <li className="char__comics-item">
          Avengers (1996) #/1
        </li>
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
