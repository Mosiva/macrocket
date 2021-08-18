import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import { Row, Col, Container } from 'react-bootstrap';


const unsplash = new Unsplash({
  accessKey: "NeWnte8AgZGLgUxinNtgYTgU-b5i_azmaqqFDjb5Jw0",
});

const useStateWithLocalStorage = localStorageKey => {
  const [query, setQuery] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, query);
  }, []);

  return [query, setQuery];
};

export default function SearchPhotos() {

  const [query, setQuery] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );
  const onChange = event => setQuery(event.target.value);

  const [pics, setPics] = useState([]);


  const searchPhotos = async (e) => {
    e.preventDefault();

    unsplash.search
      .photos(query)
      .then(toJson)
      .then((json) => {
        setPics(json.results);
      });

  };

  return (
    <>
      <Container>
        <br />
        <Row>
          <Col>
            <form className="form" onSubmit={searchPhotos}>
              <input
                type="text"
                name="query"
                className="input"
                placeholder={`Поиск`}
                value={query}
                onChange={onChange}
              />
              <button type="submit" className="button">
                Поиск
              </button>
            </form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <div class="b-marquee">
              <div class="b-marquee__text">Wallpapers Textures & Patterns Nature Current Events Architecture Business & Work Film Animals Travel Fashion Food & Drink Spirituality Experimental People Health Arts & Culture</div>
            </div>
          </Col>
        </Row>
      </Container>

      <br />

      <div className="card-list">
        {pics.map((pic) => (
          <div className="card" key={pic.id}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="100%"
              height="100%"
            ></img>
          </div>
        ))}{" "}
      </div>

    </>
  );
}
