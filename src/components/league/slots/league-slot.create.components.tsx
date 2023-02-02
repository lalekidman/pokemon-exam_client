import { FieldValues, useForm,  } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Http from 'axios'
import { useEffect, useState } from 'react';
import { IPokemon } from '../../pokemon/pokemon.list.components';
import { SERVER_BASE_URL } from '../../../common/contants';


const LeagueSlotCreateComponent = (props: any) => {
  // list of the components?
  const {register, handleSubmit, getValues} = useForm()
  const navigate = useNavigate()
  const trainerId = localStorage.getItem("trainerId")
  const [participantTypes] = useState(() => ([
    {
      label: "Solo",
      value: "solo",
    },
    {
      label: "Pair",
      value: "pair"
    }
  ]))
  console.log('getValues :>> ', getValues().type);
  const [participants, setParticipants] = useState(() => [""])
  const [pokemons, setPokemons] = useState<IPokemon[]>(() => [])
  const {leagueId} = useParams()
  const onSubmit = (formData: FieldValues) => {
    console.log('formData :>> ', formData);
    Http({
      baseURL: SERVER_BASE_URL,
      method: "POST",
      url: `/leagues/${leagueId}/slots`,
      data: {
        type: formData.type,
        participants: formData.participants.map((pokemon: string) => ({
          pokemon,
          trainer: trainerId
        }))
      }
    })
    .then((data) => {
      if (data.data.success) {
        alert("successfully added new slot.")
        navigate("/league")
      }
      // else, maybe throw some error.
    })
    .catch((err) => {
      const message = err?.response?.data?.errors[0]
      alert(message)
    })
  }
  useEffect(() => {
    Http({
      baseURL: SERVER_BASE_URL,
      method: "GET",
      url: `/pokemons?trainer_id=${trainerId}`
    })
    .then((data) => {
      if (data.data.success) {
        if (data.data.data) {
          setPokemons(data.data.data)
        }
      }
      // else, maybe throw some error.
    })
  }, [trainerId])

  const addParticipantsHandler = (ev: any) => {
    console.log('object :>> ');
    ev.preventDefault();
    setParticipants([
      ...participants,
      ""
    ])
  }
  console.log('getValues().type === "pair" :>> ', getValues().type === "pair");
  return (
    <>
      <h2>Create League Slot</h2>
      <hr/>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Type:</label>
        <select {...register(`type`)} >
          {participantTypes.map((participantType) => {
            return <option value = {participantType.value}>{participantType.label}</option>
          })}
        </select> <br />
        {
          participants.map((_, index) => {
            return <>
              <select {...register(`participants.${index}`, {value: pokemons.length >= 1 ? pokemons[0] : ""})}>
                {pokemons.map((pokemon) => {
                  return <option value = {pokemon.id}>{pokemon.name}</option>
                })}
              </select>
              <br />
            </>
          })
        }
        <button onClick={addParticipantsHandler} > Add Participant </button> < br/>
        {/* {getValues().type === "pair" ? <><button onClick={addParticipantsHandler} > Add Participant </button> < br/></> : <></>} */}
        
        <input type = 'submit' value = "submit"/>
      </form>
    </>
  );
};
export default LeagueSlotCreateComponent