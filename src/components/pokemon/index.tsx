import {
  Route,
  Routes,
} from 'react-router-dom'
import PokemonCreateComponent from './pokemon.create.components'
import PokemonListComponent from './pokemon.list.components'
const PokemonMainComponent = (props: any) => {
  console.log("ARE YOU HERE?")
  return (
    <>
      <Routes>
        <Route index element={<PokemonListComponent />} />
        <Route path='/create' element={<PokemonCreateComponent />} />
      </Routes>
    </>
  );
};
export default PokemonMainComponent