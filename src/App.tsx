import './App.css'
import { useSpotify } from './hooks/use-spotify';
import { Scopes } from '@spotify/web-api-ts-sdk';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MainView } from './components/main-view';

function App() {
  // Create a client
  console.log(window.location.href);
  const queryClient = new QueryClient();
  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    window.location.href,
    Scopes.all
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {sdk && <><MainView sdk={sdk} /></>}
        {!sdk && <>Loading</>}
      </QueryClientProvider>
    </>
  )
}

export default App
