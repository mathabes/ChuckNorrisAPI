import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [piadas, setPiadas] = useState(
    "Once a cobra bit Chuck Norris' leg. After five days of excruciating pain, the cobra died"
  );
  const [piadasFavoritas, setPiadasFavoritas] = useState([]);

  useEffect(() => {
    const piadasFavoritasNoLocalStorage = JSON.parse(
      localStorage.getItem("piadasFavoritas")
    );
    if (piadasFavoritasNoLocalStorage) {
      setPiadasFavoritas(piadasFavoritasNoLocalStorage);
    }
  }, []);

  function obterPiada() {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        setPiadas(data.value);
      });
  }

  function adicionarFavoritos() {
    const novaListaFavoritos = [...piadasFavoritas, piadas];
    setPiadasFavoritas(novaListaFavoritos);
    localStorage.setItem("piadasFavoritas", JSON.stringify(novaListaFavoritos));
  }

  function removerFavoritos(index) {
    const confirmaExclusao = window.confirm(
      "Tem certeza que quer deletar esta piada favorita?"
    );
    if (confirmaExclusao) {
      const novaFavorites = [...piadasFavoritas];
      novaFavorites.splice(index, 1);
      setPiadasFavoritas(novaFavorites);
      localStorage.setItem("piadasFavoritas", JSON.stringify(novaFavorites));
    }
  }

  return (
    <div className="App">
      <h1>Chuck Norris Jokes</h1>
      <p className="piada"> {piadas} </p>
      <button className="botao" onClick={obterPiada}>
        {" "}
        Gerar nova piada
      </button>{" "}
      <button className="botao" onClick={adicionarFavoritos}>
        {" "}
        Adicionar aos favoritos
      </button>
      <h2>Favoritos</h2>
      <ul>
        {piadasFavoritas.map((favorite, index) => (
          <li className="favoritos" key={index}>
            {favorite}{" "}
            <button
              className="botaoRemover"
              onClick={() => removerFavoritos(index)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
