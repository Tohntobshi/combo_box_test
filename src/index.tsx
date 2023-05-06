import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
    return <div className='abc'>
       hello!
    </div>
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)