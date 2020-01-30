import * as React from 'react';
import TestImg from '../assets/asfafs.jpg';
import './App.scss';

export interface HelloProps {
  compiler: string;
  framework: string;
}

const App = ({
  compiler,
  framework,
}: HelloProps): JSX.Element => (
  <h1>
    Hello from {compiler} and {framework.concat()}!
    <img src={TestImg} alt="sth" />
  </h1>
);

export default App;
