import react from 'react';
import DevicesList from "./components/DevicesList";
// import './App.css'; 
import './App.scss';

function App() {
  return (
    
      <div className="App">
        <h1 className="text-center text-white">Devices</h1>
        <DevicesList />
      </div>
  );
}

export default App;