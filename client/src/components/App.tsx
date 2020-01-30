import * as React from 'react';
import ApolloClient from 'apollo-boost';
import { useQuery, ApolloProvider } from '@apollo/react-hooks';

import { SERVER_URI } from '../config';

import ME_QUERY from './meQuery.graphql';

import './App.scss';
import TestImg from '../assets/img.jpg';

const client = new ApolloClient({
  uri: SERVER_URI,
});

export interface HelloProps {
  compiler: string;
  framework: string;
}

const App = ({
  compiler,
  framework,
}: HelloProps): JSX.Element => {
  const { loading, error, data } = useQuery(ME_QUERY, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(<br />{error.message}</p>;
  console.log('data', data);

  return (
    <ApolloProvider client={client}>
      <h1>
                Hello from {compiler} and {framework}!
        <img src={TestImg} alt="sth" />
      </h1>
    </ApolloProvider>
  );
};

export default App;
