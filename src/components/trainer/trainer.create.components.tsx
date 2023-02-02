import { FieldValues, useForm,  } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Http from 'axios'
import { SERVER_BASE_URL } from '../../common/contants';
const TrainerCreateComponent = (props: any) => {
  // list of the components?
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const onSubmit = (formData: FieldValues) => {
    console.log("formData", formData)
    Http({
      baseURL: SERVER_BASE_URL,
      method: "POST",
      url: "/trainers",
      data: formData
    })
    .then((data) => {
      if (data.data.success) {
        navigate("/trainer")
      }
      // else, maybe throw some error.
    })
    .catch((err) => {
      console.log("ERROR: ", err)
    })
  }
  return (
    <>
      <h2>Create Trainer</h2>
      <hr/>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name:</label>
        <input {...register("firstName")}/>

        <label>Last Name:</label>
        <input {...register("lastName")}/>

        <input type = 'submit' value = "submit"/>
      </form>
    </>
  );
};
export default TrainerCreateComponent