import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

const BookList = (props) => {
	console.log(props);
	const displayBooks = () => {
		let { data } = props;
		if (data.loading) {
			return (
				<div>
					<h2>Loading Books...</h2>
				</div>
			);
		} else {
			return data.books.map((book) => {
				return <li key={book.id}>{book.name}</li>;
			});
		}
	};
	return (
		<div>
			<h1>Olakunle's Reading List</h1>

			<ul>{displayBooks()}</ul>
		</div>
	);
};

export default graphql(getBooksQuery)(BookList);
