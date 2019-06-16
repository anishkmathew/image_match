import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ArticlesTable from "./articlesTable";
//import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getArticles, deleteArticle } from "../services/articleService";
/*import { getGenres } from "../services/genreService";*/
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Articles extends Component {
  state = {
    articles: [],
    //genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    //selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    //const { data } = await getGenres();
    //const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: articles } = await getArticles();
    //this.setState({ articles, genres });
    this.setState({ articles });
  }

  handleDelete = async article => {
    const originalArticles = this.state.articles;
    const articles = originalArticles.filter(m => m._id !== article._id);
    this.setState({ articles });

    try {
      await deleteArticle(article._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This article has already been deleted.");

      this.setState({ articles: originalArticles });
    }
  };
/*
  handleLike = article => {
    const articles = [...this.state.articles];
    const index = articles.indexOf(article);
    articles[index] = { ...articles[index] };
    articles[index].liked = !articles[index].liked;
    this.setState({ articles });
  };
*/
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  /*handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };*/

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,    
      searchQuery,
      articles: allArticles
    } = this.state;

    let filtered = allArticles;
    if (searchQuery)
      filtered = allArticles.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    /*else if (selectedGenre && selectedGenre._id)
      filtered = allArticles.filter(m => m.genre._id === selectedGenre._id);*/

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const articles = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: articles };
  };

  render() {
    const { length: count } = this.state.articles;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no articles in the database.</p>;

    const { totalCount, data: articles } = this.getPagedData();

    return (
      <div className="row">
       
        <div className="col">
          <Link
            to="/articles/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Article
          </Link>
          <p>Showing {totalCount} articles in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ArticlesTable
            articles={articles}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Articles;
