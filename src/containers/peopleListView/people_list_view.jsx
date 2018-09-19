// src/containers/peopleListView

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getPeopleData} from '../../actions/peopleActions'

class PeopleListContainer extends Component {

    componentDidMount() {
        this.props.requestPeopleList();
    }

    render() {
        console.log(this.props.peopleList,"fffff")
        return (
            <div className='list_conatiner'>
                <div className='header'>
                    <button className='add-button'>
                    <i className="fas fa-plus"></i> 
                    </button>
                </div>
                <div className='content'>
                    <div className='sidebar-content'>
                    dfgf
                    </div>
                    <div className='card-content'>
                    dsfdg
                    </div>
                </div>
            </div> 
        );
    }
}

const mapStateToProps = (state) => ({
    peopleList: state.peopleReducer
})

const mapDispatchToProps = dispatch => ({
    requestPeopleList: () => dispatch(getPeopleData())
})
export default connect(mapStateToProps, mapDispatchToProps)(PeopleListContainer);