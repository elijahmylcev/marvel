import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

function CharInfo() {
  return (
    <div className="char__info">
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
    </div>
  );
}

export default CharInfo;
