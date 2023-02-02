import { FieldValues, useForm,  } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Http from 'axios'
import { useEffect, useState } from 'react';
import { SERVER_BASE_URL } from '../../common/contants';
const LeagueUpdateComponent = (props: any) => {
  // list of the components?
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const {leagueId} = useParams()
  const [league, setLeague] = useState(() => ({
    id: null,
    title: "",
    location: "",
    terrain: "",
    pokemonMaxStats: 0,
    requiredSlotSize: 0,
  }))
  const onSubmit = (formData: FieldValues) => {
    Http({
      baseURL: SERVER_BASE_URL,
      method: "PATCH",
      url: `/leagues/${leagueId}`,
      data: formData
    })
    .then((data) => {
      if (data.data.success) {
        navigate("/league")
      }
      // else, maybe throw some error.
    })
    .catch((err) => {
      console.log("ERROR: ", err)
    })
  }

  useEffect(() => {
    Http({
      baseURL: SERVER_BASE_URL,
      method: "GET",
      url: `/leagues/${leagueId}`
    })
    .then((data) => {
      if (data.data.success) {
        if (data.data.data) {
          setLeague(data.data.data)
          console.log('data.data.data :>> ', data.data.data);
        }
      }
      // else, maybe throw some error.
    })
  }, [leagueId])
  if (!league.id) {
    return <></>
  }
  return (
    <>
      <h2>Update League</h2>
      <hr/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title:</label>
        <input type = "text" {...register("title", {value: league.title})}/> <br />

        <label>Location:</label>
        <input type = "text" {...register("location", {value: league.location})}/> <br />

        <label>Terrain:</label>
        <input type = "text" {...register("terrain", {value: league.location})}/> <br />
        
        <label>Pokemon Max Stats:</label>
        <input {...register("pokemonMaxStats", {valueAsNumber: true, value: league.pokemonMaxStats})}/> <br />

        <label>Required Slot Size:</label>
        <input {...register("requiredSlotSize", {valueAsNumber: true, value: league.requiredSlotSize})}/> <br />

        <input type = 'submit' value = "submit"/>
      </form>
    </>
  );
};
export default LeagueUpdateComponent