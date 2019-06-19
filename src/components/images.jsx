import React, { Component } from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import { saveImage } from "../services/imageService";

class images extends Form {
    state = {
        articleId : this.props.match.params.id,
        data: {
            url: "",
            filepath: "",
            metadata: ""
          },
          errors: {},
          responsData: {}
    
        };
        schema = {
            url: Joi.string()
                .uri()
                .required()
                .label("Url"),
            filepath: Joi.string()
                .uri()
                .required()
                .label("Filepath"),
            metadata: Joi.label("Metadataa")
            };   
            
    doSubmit = async () => {
        const { data } = await saveImage(this.state.data);
        const result = JSON.stringify(data['add']);
        this.setState({responseData: result} );
        this.setState({data: {
            url: "",
            filepath: "",
            metadata: ""
          }} );
        };   

    render() {
        return (
            <div>
               <form onSubmit={this.handleSubmit}>
                {this.renderInput("url", "Url")}
                {this.renderInput("filepath", "Filepath")}
                {this.renderTextarea("metadata", "Metadata", 'textarea')} 
                {this.renderButton("Add")}
                </form> 
                
                { this.state.responseData && <div className="m-4 border p-4" >{this.state.responseData}</div> } 
            </div>
        );
    }
}

export default images;