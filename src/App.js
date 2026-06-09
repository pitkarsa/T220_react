import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}

export default App;
