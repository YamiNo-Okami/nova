import { useState } from 'react'
import './App.css'
// import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'

function App() {
  const [collapse, setCollapse] = useState(true)



  return (
    <>
    <div className='flex'>
      <Canvas collapse={collapse} onToggle={() => setCollapse(!collapse)} />
    </div>
    </>
  )
}

export default App
