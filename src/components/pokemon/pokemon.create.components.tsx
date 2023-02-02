import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Http from 'axios'
import { SERVER_BASE_URL } from '../../common/contants';
const TrainerCreateComponent = (props: any) => {
  // list of the components?
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const pokemonTypes = [
    {
      label: "Neutral",
      value: "neatral"
    },
    {
      label: "Fire",
      value: "fire"
    },
    {
      label: "Water",
      value: "water"
    },
    {
      label: "Wind",
      value: "wind"
    },
    {
      label: "Earth",
      value: "earth"
    },
    {
      label: "Electric",
      value: "electric"
    }
  ]
  const onSubmit = (formData: FieldValues) => {
    console.log("formData", formData)
    Http({
      baseURL: SERVER_BASE_URL,
      method: "POST",
      url: "/pokemons",
      data: {
        ...formData,
        trainer: localStorage.getItem("trainerId")
      }
    })
    .then((data) => {
      if (data.data.success) {
        navigate("/pokemon")
      }
      console.log('data.data :>> ', data.data);
      // else, maybe throw some error.
    })
    .catch((err) => {
      console.log("ERROR: ", err)
    })
  }
  return (
    <>
      <h2>Create Pokemon</h2>
      <hr/>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input {...register("name")}/>

        <label>Name:</label>
        <select {...register("type")}>
          {pokemonTypes.map((type) => {
            return <option value={type.value}>{type.label}</option>
          })}
          <option value=""></option>
        </select>
        <div>
          <h4>Stats</h4>
          <label>Attack:</label>
          <input {...register("stats.attack", {valueAsNumber: true})}/>
          <label>Speed:</label>
          <input {...register("stats.speed", {valueAsNumber: true})}/>
          <label>Defense:</label>
          <input {...register("stats.defense", {valueAsNumber: true})}/>
        </div>
        <input type={"submit"} value="Submit" />
      </form>
    </>
  );
};
export default TrainerCreateComponent