
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ThemeProvider } from '@emotion/react';
import { appTheme } from './theme'
import { CartPage } from './pages/cart';
import { MenuBar } from './components/menuBar';

const App = () => {
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
