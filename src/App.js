
import React from 'react';
import './App.css';
import GUsers from './GithubUsers/GUsers';
import Rheader from './RocketUsplashApiF/Rcomponent/rheader-navbar';
import RocketUnsplashApi from './RocketUsplashApiF/RocketUnsplashApi';


function App() {
  return (
    <div className="App">
      <Rheader />
      <GUsers />
{/*       <RocketUnsplashApi /> */}
    </div>

  );
}
export default App;