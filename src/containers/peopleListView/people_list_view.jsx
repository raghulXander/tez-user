// src/containers/peopleListView

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import {getPeopleData} from '../../actions/peopleActions'


class PeopleListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            peopleIds: [],
            open: false
        }
    }
    
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.props.requestPeopleList();
    }

    componentWillReceiveProps(nextProps, nextState) {
        if ( nextProps.peopleList.result !== null && this.props.peopleList !== nextProps.peopleList) {
            this.setState({
                count: nextProps.peopleList.result.People.length
            })
        }
    }

    render() {
        console.log(this.props.peopleList,"fffff")
        const {peopleIds, count, open} = this.state;
        return (
            <div className='list_conatiner'>
                <div className='header'>
                    <button className='add-button' onClick={this.onOpenModal}>
                    <i className="fas fa-plus"></i> 
                    </button>
                </div>
                <div className='content'>
                    <div className='sidebar-content'>
                        <div className="people-list-header">
                            <label  className="checkbox_service">
                                <input type="checkbox" checked={peopleIds.length === count} 
                                    onChange={this.selectAllPeoples.bind(this)} id="people" />
                                <label className="check-people-label" htmlFor="people">&nbsp;</label>
                            </label>
                            <div className="name-label">People</div>
                            <i className="fas fa-trash"></i> 
                        </div>
                        {this.renderPeopleLists()}
                    </div>
                    <div className='card-content'>
                    dsfdg
                    </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    {this.renderModal()}
                </Modal>
            </div> 
        );
    }

    renderModal() {
        let {fieldValues} =  this.state;

        return (
            <div className="popup-submit">
            <div className="popup-confirm-section">
                <div className="popup-confirm">Confirm Details</div>
            </div>
            <form>
                
            </form>
            <div className="button-section">
                <button className="confirm-button" onClick={this.handleFormSubmit.bind(this)}><span>Confirm</span></button>
              
            </div>
        </div>
        )
    }

    handleFormSubmit() {

    }

    selectAllPeoples() {
        let {peopleList} = this.props;
        let {peopleIds} = this.state;
        if (peopleIds.length > 0) {
            peopleIds = [];
        } else {
            peopleList.result.People.map((people, idx) => {
                peopleIds.push(people.id)
            });
        }
        this.handleAllPeopleCheck(true)

        this.setState({
            peopleIds
        })
    }

    selectPeople(id) {
        let {peopleIds} = this.state;

        if (!peopleIds.includes(id)) {
            peopleIds.push(id)
        } else {
            peopleIds = peopleIds.filter(item => item !== id);
        }

        this.setState({
            peopleIds
        })

        this.handleAllPeopleCheck(false)
    }

    handlePeopleCheck(id) {
        let {peopleIds} = this.state;
        console.log(peopleIds,"mainCategoryIds");
        if (peopleIds.includes(id)) {
            return true;
            
        } else {
            return false;
        }
    }

    handleAllPeopleCheck(status) {
        if (status) {
            return true;
        }

        if (this.props.peopleList.result !== null && this.state.peopleIds.length === this.props.peopleList.result.People.length) {
            return true;
        }

        return false
    }

    renderPeopleLists() {
        const {peopleList} = this.props;

        if (!this.props.peopleList.loading && this.props.peopleList.result !== null && this.props.peopleList.result.People.length > 0) {
            
            return this.props.peopleList.result.People.map((people, idx) => {
                return (
                    <div key={idx} className="people-list">
                        <label className="checkbox_service ">
                            <input type="checkbox" id={people.name}
                                checked={this.handlePeopleCheck(people.id)}
                                onChange={this.selectPeople.bind(this, people.id)} />
                            <label className="check-people-label" htmlFor={people.name}>&nbsp;</label>
                        </label>
                        <div className="name-label">{people.name}</div>
                    </div>
                )
            })
        }
    }
}

const mapStateToProps = (state) => ({
    peopleList: state.peopleReducer
})

const mapDispatchToProps = dispatch => ({
    requestPeopleList: () => dispatch(getPeopleData())
})
export default connect(mapStateToProps, mapDispatchToProps)(PeopleListContainer);