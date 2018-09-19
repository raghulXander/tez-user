// src/containers/peopleListView

import React, { Component } from 'react';
import Rating from 'react-rating';

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
                        <div className='name'>{this.props.name}</div>
                    </div>
                </div>
                <div className='right-col col'>
                    <Rating
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        readonly={true}
                    />
                </div>
            </div> 
        );
    }
}

export default (PeopleCard);