import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
    this.submitBook = this.submitBook.bind(this);
  }

  displayAuthors() {
    let data = this.props.getAuthorsQuery;

    if (data.loading) {
      return(<option disabled>Loading authors...</option>); 
    } else {
      return data.authors.map(author => {
        return(<option value={ author.id } key={author.id}>{ author.name }</option>);
      });
    }
  }

  submitBook(event) {
    event.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries:[{
        query: getBooksQuery
      }]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={ this.submitBook }>
        <div className="field">
          <label>Book name:</label>
          <input type="text" name="name" onChange={ (event) => this.setState({ name: event.target.value }) } />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" onChange={ (event) => this.setState({ genre: event.target.value }) } />
        </div>

        <div className="field">
          <label>Author:</label>

          <select name="authorId" onChange={ (event) => this.setState({ authorId: event.target.value }) }>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);