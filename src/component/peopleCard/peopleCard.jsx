// src/containers/peopleListView

import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class PeopleCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            peopleIds: [],
            open: false
        }
    }

    render() {

        return (
            <div className='card_container'>
                <div className='header'>
                    <div className="left-col col">
                        <div className='image'>
                            <img className="user_image" alt={"logo"} src={this.props.imageUrl} draggable={false} />
                        </div>
                    </div>
                    <div className='right-col col'>
                        <StarRatings
                            rating={this.props.rating}
                            starRatedColor="red"
                            numberOfStars={5}
                            starDimension="40px"
                            starSpacing="15px"
                            name='rating'
                        />
                    </div>
                </div>
                <div className="content">
                    <div className="field">
                        <div className='label'>Name</div>
                        <div className='field_value'>{this.props.name}</div>
                    </div>
                    <div className="field">
                        <div className='label'>id</div>
                        <div className='field_value'>{this.props.id}</div>
                    </div>
                    <div className="field">
                        <div className='label'>Description</div>
                        <div className='field_value'>{this.props.Description}</div>
                    </div>
                    {this.props.likes.length > 0 && <div className="field">
                        <div className='label likes'><span>Likes</span> <i className="fas fa-thumbs-up"></i> </div>
                        <div className='field_value'>
                            <ol>
                                {this.props.likes.map((like, idx) => {
                                    return (
                                        <li className="item">{like}</li>
                                    )
                                 })}
                            </ol>
                        </div>
                    </div>}
                    {this.props.dislikes.length > 0 &&<div className="field">
                        <div className='label dislikes'><span>DisLikes</span> <i className="fas fa-thumbs-down"></i> </div>
                        <div className='field_value'>
                            <ol>
                                {this.props.dislikes.map((dislike, idx) => {
                                    return (
                                        <li className="item">{dislike}</li>
                                    )
                                 })}
                            </ol>
                        </div>
                    </div>}
                </div>
            </div> 
        );
    }
}

export default PeopleCard;