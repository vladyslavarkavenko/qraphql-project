import * as React from 'react';
import TestImg from '../assets/asfafs.jpg';
import './Hello.scss';

export interface HelloProps {
  compiler: string;  framework: string;
}

const Hello = ({
  compiler,
  framework,
}: HelloProps): JSX.Element => (
  <h1>
    Hello from {compiler} and {framework.concat()}!
    <img src={TestImg} alt="sth" />
  </h1>
);

export default Hello;
