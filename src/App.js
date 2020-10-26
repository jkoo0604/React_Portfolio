import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/analytics';

import NavBar from './components/nav/NavBar';
import WindowDimensionProvider from './components/layout/DimensionProvider';
import About from './sections/About';
import Contact from './sections/Contact';
import Landing from './sections/Landing';
import Project from './sections/Project';
import {firebaseConfig} from './config/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
};
firebase.analytics();

function App() {
  const proj = [1, 2, 3];

  return (
    <WindowDimensionProvider>
      <div className="App">
        <NavBar />
          <Landing />
          <About />
          {
            proj.map((p) => (
              <Project projectId={p} key={`project-${p}`} containerId={`Project-${p}`} />
            ))
          }
          <Contact />
      </div>
    </WindowDimensionProvider>
  );
}

export default App;
