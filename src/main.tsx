import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PageFetch from './components/PageFetch.tsx';
import LoadList from './components/LoadList.tsx';
import MangaFetch from './components/MangaFetch.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element : <PageFetch/>
  },
  {
    path: '/chapter',
    element: <LoadList />
  },
  {
    path: '/manga',
    element: <MangaFetch />
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
