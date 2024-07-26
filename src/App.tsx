// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import Button from '@mui/material/Button';
// import { Router, Route } from '@mui/icons-material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ThemeProvider } from '@emotion/react';
import { appTheme } from './theme'
import { CartPage } from './pages/cart';
import { MenuBar } from './components/menuBar';

const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={appTheme}>
      <Router>
      <MenuBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
