import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Estudos from './pages/Estudos'
import Biblioteca from './pages/Biblioteca'
import Canais from './pages/Canais'
import Esperanto from './pages/Esperanto'
import Glossario from './pages/Glossario'
import Sobre from './pages/Sobre'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudos" element={<Estudos />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/canais" element={<Canais />} />
        <Route path="/esperanto" element={<Esperanto />} />
        <Route path="/glossario" element={<Glossario />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
