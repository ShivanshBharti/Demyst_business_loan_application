import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './components/Home';
import { Application } from './components/Application';
import { Review } from './components/Review';
import { Final } from './components/Final';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/application",
    element: <Application />,
  },
  {
    path: "review",
    element: <Review />,
  },
  {
    path: "final",
    element: <Final />,
  }
]);

export default function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}