import React, { useState } from 'react'
import {
  Route,
  Routes,
  Link
} from 'react-router-dom'
import TrainerMainComponent from './trainer'
import PokemonMainComponent from './pokemon'
import LeagueMainComponent from './league'
const App = (props: any) => {
  return (
    <>
      <ul>
        <li>
          <Link to="/trainer"> Trainer </Link>
        </li>
        <li>
          <Link to="/pokemon"> Pokemon </Link>
        </li>
        <li>
          <Link to="/league"> League </Link>
        </li>
      </ul>
      <Routes>
        <Route path='/trainer/*' element={<TrainerMainComponent />} />
        <Route path='/pokemon/*' element={<PokemonMainComponent />} />
        <Route path='/league/*' element={<LeagueMainComponent />} />
      </Routes>
    </>
  );
};
export default App