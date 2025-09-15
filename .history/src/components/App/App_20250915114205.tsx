
import { Route, Routes } from 'react-router'
import './App.css'
import LayoutFront from '../LayoutFront/LayoutFront'
import LayoutBack from '../LayoutBack/LayoutBack'

export default function App() {

  return (
    <div className="App">

        <Routes>
          <Route path="*" element={<LayoutFront />} />
          <Route path="/admin" element={<LayoutBack />} />
        </Routes>

    </div>
  )
}

