import './App.css'
import SearchPage from './components/search'
import ShowPage from './components/show'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
          <Route path="/show" element={<ShowPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
