import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ExamPage from './pages/ExamPage'
import PracticePage from './pages/PracticePage'
import RandomPage from './pages/RandomPage'
import WrongBookPage from './pages/WrongBookPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="exam" element={<ExamPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="random" element={<RandomPage />} />
          <Route path="wrong" element={<WrongBookPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
