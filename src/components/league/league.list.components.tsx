import React, { useEffect, useState } from 'react'
import {
  useNavigate
} from 'react-router-dom'
import Http from 'axios'
interface ILeague {
  id: string
  title: string
  location: string
  terrain: string
  requiredSlotSize: number
  pokemonMaxStats: number
}
const LeagueListComponent = (props: any) => {
  // list of the components?
  const navigate = useNavigate()
  const [leagues, setLeagues] = useState<ILeague[]>(() => [])
  useEffect(() => {
    Http({
      baseURL: "http://localhost:3000/api",
      method: "GET",
      url: "/leagues"
    })
    .then((data) => {
      console.log('data.data :>> ', data.data);
      if (data.data.success) {
        setLeagues(data.data.data)
      }
      // else, maybe throw some error.
    })
  }, [])

  return (
    <>
      <h2>List League</h2>
      <hr/>
      <button onClick={() => navigate("/league/create")}>Add League</button>
      <ul>
        {
          leagues.map((league) => {
            return <li>
              <b>Title: {league.title}</b> <br />
              Location: <label>{league.location}</label> <br/>
              Terrain: <label>{league.terrain}</label> <br/>
              Pokemon Max Stats/Attributes: <label>{league.pokemonMaxStats}</label> <br/>
              Required Slot Size: <label>{league.requiredSlotSize}</label> <br/>
            <button onClick={() => navigate(`/league/${league.id}/edit`)}>Edit</button>
            <button onClick={() => navigate(`/league/${league.id}/slots`)}>Add Slot</button>
            </li>
          })
        }
      </ul>
    </>
  );
};
export default LeagueListComponent