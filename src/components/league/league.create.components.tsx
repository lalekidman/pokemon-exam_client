import { FieldValues, useForm,  } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Http from 'axios'
import { SERVER_BASE_URL } from '../../common/contants';
const LeagueCreateComponent = (props: any) => {
  // list of the components?
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const onSubmit = (formData: FieldValues) => {
    Http({
      baseURL: SERVER_BASE_URL,
      method: "POST",
      url: "/leagues",
      data: {
        ...formData,
        trainer: localStorage.getItem("trainerId")
      }
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
  return (
    <>
      <h2>Create League</h2>
      <hr/>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title:</label>
        <input type = "text" {...register("title")}/> <br />

        <label>Location:</label>
        <input type = "text" {...register("location")}/> <br />

        <label>Terrain:</label>
        <input type = "text" {...register("terrain")}/> <br />
        
        <label>Pokemon Max Stats:</label>
        <input {...register("pokemonMaxStats", {valueAsNumber: true})}/> <br />

        <label>Required Slot Size:</label>
        <input {...register("requiredSlotSize", {valueAsNumber: true})}/> <br />

        <input type = 'submit' value = "submit"/>
      </form>
    </>
  );
};
export default LeagueCreateComponent