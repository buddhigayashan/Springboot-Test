import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './routes.jsx';
import Loader from './components/Loader.jsx';

const App = () => (
  <Suspense fallback={<Loader message="Loading EISLOP..." />}>
    <RouterProvider router={routes} future={{ v7_startTransition: true }} />
  </Suspense>
);

export default App;
