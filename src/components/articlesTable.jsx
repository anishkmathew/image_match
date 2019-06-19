import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
/*import Like from "./common/like";*/

class ArticlesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: article => <Link to={`/articles/${article._id}`}>{article.title}</Link>
    },
    {
      label: "Image",
      content: article => <img width="50px" src={`${article.image}`} />
    },
    {
      label: "Action",
      content: article => <Link to={`/images/${article._id}`}>Add Images</Link>
    },
    /*{ path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: article => (
        <Like liked={article.liked} onClick={() => this.props.onLike(article)} />
      )
    },
    {
      key: "delete",
      content: article => (
        <button
          onClick={() => this.props.onDelete(article)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }*/
  ];

  render() {
    const { articles, onSort, sortColumn } = this.props;
    

    return (
      
      <Table
        columns={this.columns}
        data={articles}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ArticlesTable;
