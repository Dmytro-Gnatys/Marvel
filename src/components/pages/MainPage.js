import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);
  // описываем свойство которое планируем использовать в компоненте - нам нужно вытащить id в компоненте charinfo

  // устанавливаем это свойство через аргумент, а переменную передаем props-ом вниз компоненту
  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
    <Helmet>
      <meta
        name="description"
        content="Marvel information portal"
      />
      <title>Marvel information portal</title>
    </Helmet>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />
        <div>
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
        <CharSearchForm/>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
