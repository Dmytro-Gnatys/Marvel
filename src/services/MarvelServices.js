import { useHttp } from "../hooks/http.hooks";

const useMarvelServices = () => {
  const { loading, request, error, clearError } = useHttp();
  // достаем сущности из нашего хука что б использовать их в данном сервисе

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apikey = "apikey=f73fd5bce811dfbfb951cb89df141472";
  const _apiOffset = 210; // базоый отступ (offset) - размер блока куда подгружаются елеиенты после запроса на сервер

  // в качестве аргумента передаем значение offset которое нам нужно, а если не передаем ничего через аргумент, то функция возьмет значение базовое = _apiOffset (210)
  const getAllCharacters = async (offset = _apiOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = _apiOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`
    );
    return res.data.results.map(_transformComics);
  };
  // https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=210&apikey=f73fd5bce811dfbfb951cb89df141472

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apikey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apikey}`);
		return res.data.results.map(_transformCharacter);
	};

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apikey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      language: comics.textObjects[0]?.language || "en-us",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacterByName,
    getCharacter,
    clearError,
    getAllComics,
    getComics,
  };
  // возвращаем сущности для возможности работы с ними в других компонентах
};

export default useMarvelServices;
