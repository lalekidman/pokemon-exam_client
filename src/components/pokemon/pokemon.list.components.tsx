import React, { useEffect, useState } from 'react'
import {
  useNavigate
} from 'react-router-dom'
import Http from 'axios'
export interface IPokemon {
  id: string
  name: string
  type: string
}
const PokemonCreateComponent = (props: any) => {
  // list of the components?
  const navigate = useNavigate()
  const [pokemons, setPokemons] = useState(() => [])
  useEffect(() => {
    Http({
      baseURL: "http://localhost:3000/api",
      method: "GET",
      url: "/pokemons"
    })
    .then((data) => {
      console.log('data.data :>> ', data.data);
      if (data.data.success) {
        setPokemons(data.data.data)
      }
      // else, maybe throw some error.
    })
  }, [])

  return (
    <>
      <h2>List Pokemon</h2>
      <hr/>
      <button onClick={() => navigate("/pokemon/create")}>Add Pokemon</button>
      <ul>
        {
          pokemons.map((pokemon: any) => {
            return <li>{pokemon.name}</li>
          })
        }
      </ul>
    </>
  );
};
export default PokemonCreateComponent