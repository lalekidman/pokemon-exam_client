import {
  Route,
  Routes,
} from 'react-router-dom'
import TrainerCreateComponent from './trainer.create.components'
import ListMainComponent from './trainer.list.components'
const TrainerMainComponent = (props: any) => {
  console.log("ARE YOU HERE?")
  return (
    <>
      <Routes>
        <Route index element={<ListMainComponent />} />
        <Route path='/create' element={<TrainerCreateComponent />} />
      </Routes>
    </>
  );
};
export default TrainerMainComponent