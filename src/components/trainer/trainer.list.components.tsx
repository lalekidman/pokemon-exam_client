import React, { useEffect, useState } from 'react'
import {
  useNavigate
} from 'react-router-dom'
import Http from 'axios'
import { FieldValues, useForm,  } from 'react-hook-form'
interface ITrainer {
  id: string
  firstName: string
  lastName: string
}
const TrainerCreateComponent = (props: any) => {
  // list of the components?
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  console.log("ARE HERERER")
  const [trainers, setTrainer] = useState<ITrainer[]>(() => [])
  useEffect(() => {
    Http({
      baseURL: "http://localhost:3000/api",
      method: "GET",
      url: "/trainers"
    })
    .then((data) => {
      console.log('data.data :>> ', data.data);
      if (data.data.success) {
        setTrainer(data.data.data)
      }
      // else, maybe throw some error.
    })
  }, [])

  const trainerButtonHandler = (trainer: ITrainer) => {
    localStorage.setItem("trainerId", trainer.id)
  }

  return (
    <>
      <h2>List Trainer</h2>
      <hr/>
      <button onClick={() => navigate("/trainer/create")}>Add Trainer</button>
      <ul>
        {
          trainers.map((trainer: any) => {
            return <li>{trainer.firstName} {trainer.lastName} <button onClick={() => trainerButtonHandler(trainer)}>Use</button></li>
          })
        }
      </ul>
    </>
  );
};
export default TrainerCreateComponent