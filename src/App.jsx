import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Project from './pages/Project'
import FbCover from './pages/FbCover'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {import.meta.env.DEV && <Route path="fb-cover" element={<FbCover />} />}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work/:slug" element={<Project />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
