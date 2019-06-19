import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Joi from "joi-browser";
import { searchImage } from "../services/searchService";
import { getArticles } from "../services/articleService";
import Form  from './common/form';

class Search extends Form {
    state = {
        
        data: {
            url: ""           
          },
          errors: {},
          responsData: {},
          article: [],
          photos: [],
          result : {
            status: "",
            error: [],
            matches: []
          },
          load :false
        };

       
    
        schema = {
            url: Joi.string()
                .uri()
                .required()
                .label("Url")
            };   
            
    doSubmit = async () => {
        const { data } = await searchImage(this.state.data);
        this.setState({load: true});
        const result = JSON.stringify(data);

        const { data: articles } = await getArticles();
        const dummyArticle = articles[0];
        this.setState({ article: dummyArticle, photos: dummyArticle.photos  });

        this.setState({responseData: result} );
        this.setState({data: {
                        url: ""
                        }, 
                        result: {
                            status: data['status'],
                            error: data['error'],
                            matches: data['result']
                        }} );
        };   

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                {this.renderInput("url", "Url")}
               
                {this.renderButton("Search")}
                </form>
                {(!this.state.responseData && this.state.load == true) && <Loader 
                    type="Puff"
                    color="#00BFFF"
                    height="200"	
                    width="200"
                />  }
                { this.state.responseData && <h3>This image matches the following Articles.</h3> }
                <h2>{this.state.article.title}</h2> 
                { this.state.result.matches.map((m)=> <div className="m-2" key={m.score}> <img width="100px" src={m.filepath} /> Score :{m.score}  </div>)}
                { this.state.responseData && <div className="m-4 border p-4" >{this.state.responseData}</div> } 
            </div>
        );
    }
}

export default Search;