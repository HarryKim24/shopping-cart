import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Routes from './routes';

const router = createBrowserRouter(Routes);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
