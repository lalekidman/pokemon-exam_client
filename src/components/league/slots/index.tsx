import {
  Route,
  Routes,
} from 'react-router-dom'
import LeagueSlotCreateComponent from './league-slot.create.components'
const LeagueMainComponent = (props: any) => {
  return (
    <>
      <Routes>
        {/* <Route index element={<LeagueListComponent />} /> */}
        <Route path='/create' element={<LeagueSlotCreateComponent />} />
      </Routes>
    </>
  );
};
export default LeagueMainComponent