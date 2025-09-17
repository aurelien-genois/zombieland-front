
import { Route, Routes } from 'react-router'
import './App.css'
import LayoutFront from '../Layout/LayoutFront'
import LayoutBack from '../Layout/LayoutBack'

export default function App() {

  return (
    <div className="App bg-black-bg-main">

        <Routes>
          <Route path="/admin/*" element={<LayoutBack />} />
          <Route path="*" element={<LayoutFront />} />
        </Routes>

    </div>
  )
};

