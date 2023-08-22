
import './App.css'
import PageFetch from './components/PageFetch'
import LoadList from './components/LoadList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MangaFetch from './components/MangaFetch'

function App() {
    
  return(
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageFetch/>}>
          <Route path ="manga_list" element ={<LoadList/>} />
          <Route path ="manga_display" element ={<MangaFetch/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
      
}

export default App
