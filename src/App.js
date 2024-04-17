import './index.css';
import { HeaderSite } from './components/HeaderSite';
import { Catalog } from './components/Catalog';
import { Logo } from './components/Logo';
import { getData } from './getData';
import { getDataBasket } from './getDataBasket';
import { Basement } from './components/Basement';
import { Outlet } from 'react-router-dom';


import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className='container'>
    <HeaderSite />
    <Outlet />
    <Basement />
    </div>
    </QueryClientProvider>
  );
}




export default App;
