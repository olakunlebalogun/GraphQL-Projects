import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { Button, Form } from "react-bootstrap";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

const AddBook = (props) => {
	const [book, setBook] = useState({
		name: "",
		genre: "",
		authorId: "",
	});
	const displayAuthors = () => {
		let data = props.getAuthorsQuery.data || {};
		if (data.loadings) {
			return <option disabled>Loading Authors</option>;
		} else {
			return data.authors.map((author) => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addBookMutation({
			variables: {
				name: book.name,
				genre: book.genre,
				authorId: book.authorId,
			},
		});
		console.log(book);
	};
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicBook">
					<Form.Label>Book Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Book Name"
						value={book.name}
						onChange={(e) =>
							// setBook((prev) => {
							// 	prev.name = e.target.value;
							// })
							setBook({ ...book, name: e.target.value })
						}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicGenre">
					<Form.Label>Genre</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Genre"
						value={book.genre}
						onChange={(e) =>
							// setBook((prev) => {
							// 	prev.genre = e.target.value;
							// })
							setBook({ ...book, genre: e.target.value })
						}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="selectAuthor">Select Author</Form.Label>
					<Form.Select
						id="select"
						onChange={(e) =>
							// setBook((prev) => {
							// 	prev.authorId = e.target.value;
							// })
							setBook({ ...book, authorId: e.target.value })
						}
					>
						<option>Choose Author</option>
						{displayAuthors()}
					</Form.Select>
				</Form.Group>

				<Button type="submit" className="btn">
					Add Book
				</Button>
			</Form>
		</div>
	);
};

// export default graphql(getAuthorsQuery)(AddBook);

export default compose(
	graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
	graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
