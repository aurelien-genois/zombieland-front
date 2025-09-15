
import { Route, Routes } from 'react-router'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './App.css'
import HomePage from '../../pages/HomePage/HomePage'

export default function App() {

  return (
    <div className="App">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

