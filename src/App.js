import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import "bootstrap/dist/css/bootstrap.min.css";

const client = new ApolloClient({
	// uri: "http://localhost:4500/graphql",
	link: createHttpLink({ uri: "http://localhost:4500/graphql" }),

	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<h1>Hi there! :book </h1>
				<div className="container">
					<BookList />
					<AddBook />
				</div>
			</div>
		</ApolloProvider>
	);
}

export default App;
