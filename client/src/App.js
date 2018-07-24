import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err));

    console.log("state.data", this.state.data);
  }

  callApi = async () => {
    const response = await fetch('/api/blogs');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log("body", body);
    return body;
  };

  renderBlogsList() {
    return this.state.data.map((blog) => {
      return (
        <tr className="Blogs-table" key={blog._id}>
          <td>{blog.title}</td>
          <td>{blog.content}</td>        
        </tr>        
      )
    })

  }

  render() {
    if (!this.state.data) {
      return <div> Loading... </div>
    }
    else {
      return (
        <div className="App">          
          <h2>Blogs</h2>
          <table className="Blog-table-center">
          <tbody>
            <th>Title</th>
              <th>Content</th>
            {this.renderBlogsList()}
          </tbody>     
          </table>     
        </div>
      );
    }
  }
}

export default App;
