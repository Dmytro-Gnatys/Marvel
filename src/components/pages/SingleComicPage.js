import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import useMarvelServices from "../../services/MarvelServices";
import ErrorMassage from "../errorMassage/ErrorMassage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";

import "./singleComicPage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();
  // comicId - параметр который мы задали через path="/comics/:comicId" в App
  // useParams вернет нам объект с данными и ID

  const [comic, setComic] = useState(null);
  // в этой переменной будет объект со всеми данными про комикс (его достает хук useParams())

  const { loading, error, getComics, clearError } = useMarvelServices();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComics(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
    // если запрос будет успешный то результат запишется в переменную comic
  };

  const errorMassage = error ? <ErrorMassage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      <AppBanner />
      {errorMassage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;
  // вытаскиваем значения из успешно принятого объекта comic (из onComicLoaded)

  return (
    <div className="single-comic">
      <Helmet>
        <meta
          name="description"
          content={`${title} comics book`}
        />
        <title>{title}</title>
    </Helmet>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language : {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
