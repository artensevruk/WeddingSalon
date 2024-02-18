import './index.css';
import { HeaderSite } from './components/HeaderSite';
import { Basement } from './components/Bsement';
import { Logo } from './components/Logo';
import { getData } from './getData';
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
    <Logo />
    <Basement />
    </div>
    </QueryClientProvider>
  );
}
getData();

export default App;
