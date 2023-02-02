import {
  Route,
  Routes,
} from 'react-router-dom'
import LeagueCreateComponent from './league.create.components'
import LeagueListComponent from './league.list.components'
import LeagueUpdateComponent from './league.update.components'
import LeagueSlotCreateComponent from './slots/league-slot.create.components';
const LeagueMainComponent = (props: any) => {
  return (
    <>
      <Routes>
        <Route index element={<LeagueListComponent />} />
        <Route path='/create' element={<LeagueCreateComponent />} />
        <Route path='/:leagueId/edit' element={<LeagueUpdateComponent />} />
        <Route path='/:leagueId/slots' element={<LeagueSlotCreateComponent />} />
      </Routes>
    </>
  );
};
export default LeagueMainComponent