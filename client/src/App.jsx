import './App.css';
import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';

//Main GraphQL API endpoint
const httplink= createHttpLink({
  url: '/graphql',
});

//request middleware attaching jwt token to request
const authLink =setContext((_, {headers}) =>{
  const token = localStorage.getItem('id_token');
  //return headers so httplink can read it
  return{
      headers:{
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
});

const client = new ApolloClient({
  //set up middleware to execute authLink before qraphql API
  link: authLink.concat(httplink),
  cache: new InMemoryCache(),

});

function App() {
  return (
    <ApolloProvider client={client}>
    <>
      <Navbar />
      <Outlet />
    </>
    </ApolloProvider>
  );
}

export default App;
