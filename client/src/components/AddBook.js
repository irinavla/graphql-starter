import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';


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
    let data = this.props.data;

    if (data.loading) {
      return(<option disabled>Loading authors...</option>); 
    } else {
      return data.authors.map(author => {
        return(<option value={ author.name } key={author.id}>{ author.name }</option>);
      });
    }
  }

  submitBook(event) {
    event.preventDefault();
    console.log(this.state);
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

export default graphql(getAuthorsQuery)(AddBook);