import React, { Component } from "react";
import Loader from "react-loader-spinner";
//import Joi from "joi-browser";
import Form from "./common/form";
import { getArticles } from "../services/articleService";
class ArticleDetails extends Form {
  state = {
    article: [],
    photos: [],
    articleId: this.props.match.params.id,
    data: [{
      url: "",
      filepath: "",
      metadata: {}
    }],
    errors: {}
  };



  async componentDidMount() {
    const { data: articles } = await getArticles();
    const curArticle = articles.filter(m => m._id === this.state.articleId)[0];
    this.setState({ article: curArticle, photos: curArticle.photos });
  }
  render() {
    return (
      <div>
        {(!this.state || !this.state.article.title) && (
          <Loader type="Puff" color="#00BFFF" height="200" width="200" />
        )}
        {this.state && this.state.article.title && (
          <div>
            <h1>{this.state.article.title}</h1>

            <h3>Photos</h3>
            <div>
              {this.state.photos.map(m => (
                <span className="m-2" key={m._id}>
                  <img width="100px" src={m.url} />
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ArticleDetails;
