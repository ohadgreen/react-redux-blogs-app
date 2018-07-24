import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { fetchPosts, deletePost, createPost } from './actions/index';

class AppRedux extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    onDelete(id) {       
        let postToDelete = this.props.posts.filter(p => p._id === id );        
        const confirmDelete = window.confirm("delete blog \"" + postToDelete[0].title + "\" ?");
        if (confirmDelete){
            this.props.deletePost(id);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.getTitle.value;
        const content = this.getContent.value;
        const data = {
            id: new Date(),
            title,
            content
        }
        console.log("new blog", data);
        createPost(data);
        this.props.fetchPosts();
    }

    renderBlogsList() {
        return this.props.posts.map((blog) => {
            return (
                <tr className="Blogs-table" key={blog._id}>
                    <td>{blog.title}</td>
                    <td>{blog.content}</td>
                    <td><button type="button" onClick={() => this.onDelete(blog._id)} >Delete</button></td>
                </tr>
            )
        })

    }

    render() {
        if (!this.props.posts) {
            return <div> Loading... </div>
        }
        else {
            return (
                <div className="App">
                    <h2>Blogs with Redux</h2>
                    <div className="post-container">
                        <h3 className='post_heading'>New Blog</h3>
                        <form onSubmit={this.handleSubmit}>
                            <table className="Blog-table-center">                                
                                <tbody>
                                    <tr className="Blogs-table">
                                        <td>Title:<input required type="text" ref={(input) => this.getTitle = input} placeholder="Title" /></td>
                                        <td>Content:<input required type="text" ref={(input) => this.getContent = input} placeholder="Content" /></td>
                                        <td><button type="sbumit">Submit</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>

                    <table className="Blog-table-center">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBlogsList()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}
export default connect(mapStateToProps, { fetchPosts, deletePost, createPost })(AppRedux);
