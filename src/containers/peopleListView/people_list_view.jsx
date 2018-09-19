// src/containers/peopleListView

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";
import Loader from 'react-loader-spinner'
import Dropzone from 'react-dropzone'

import {getPeopleData, removePeoples} from '../../actions/peopleActions'
import PeopleCard from '../../component/peopleCard/peopleCard'; 


class PeopleListContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            peopleIds: [],
            open: false,
            active: "1",
            accepted: [],
            rejected: [],
            fieldValues: {
                name: '',
                id: 0,
                description: ''
            }
            
        }

        this.onDrop = this.onDrop.bind(this);
    }
    
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleCancelSubmit() {
        let fieldValues = {
            name: '',
            id: 0,
            description: ''
        };

        this.setState({ open: false, fieldValues  });
    }

    componentDidMount() {
        this.props.requestPeopleList();
    }

    componentWillReceiveProps(nextProps, nextState) {
        if ( nextProps.peopleList.result !== null && this.props.peopleList !== nextProps.peopleList) {
            console.log(nextProps.peopleList,"nextProps.peopleList")
            this.setState({
                count: nextProps.peopleList.result.People.length
            })
        }
    }

    render() {
        console.log(this.props.peopleList,"fffff")
        const {peopleIds, count, open, active} = this.state;
        const {peopleList} = this.props;

        if (peopleList.loading || peopleList.result === null) {
            return(
                <div className='list_container loader'>
                    <Loader 
                    type="Plane"
                    color="#00BFFF"
                    height="100"	
                    width="100"
                    />  
                </div> 
               );
        }

        return (
            <div className='list_container'>
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
                            <i className="fas fa-trash" onClick={this.handleDeleteData.bind(this)}></i> 
                        </div>
                        {this.renderPeopleLists()}
                    </div>
                    <div className='card-content'>
                        {peopleList.result.People.map((cardData, idx) => {
                            if (cardData.id === active && cardData) {
                                return (
                                    <PeopleCard 
                                        imageUrl={cardData.img}
                                        name={cardData.name}
                                        id={cardData.id}
                                        Description={cardData.Description}
                                        likes={cardData.Likes}
                                        dislikes={cardData.Dislikes}
                                        rating={cardData.rating}
                                    />
                                )
                            }
                        })}
                        
                    </div>
                </div>
                <Modal open={open} onClose={this.onCloseModal} center styles={{
                    modal: {minWidth: "60%"}
                }}>
                    {this.renderModal()}
                </Modal>
            </div> 
        );
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    handleDeleteData() {
        let {peopleIds} = this.state;
        this.props.requestRemoveData(peopleIds)

    }

    renderModal() {
        let {fieldValues} =  this.state;

        return (
            <div className="popup-submit">
                <div className="form-upload">
                    <Dropzone
                        className="dropzone"
                        multiple={false}
                        accept="image/jpeg, image/png"
                        onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                    >
                        <div className="upload-icon"><i class="fa fa-file-image"></i></div>  
                    </Dropzone>
                </div>
            <form>
                <div className='form-content'>
                    <div className="field_values">
                        <div className='label'>Name</div>
                        <input type="text" className='input_field' onChange={this.handleInputChange.bind(this, 'name')} />
                    </div>
                    <div className="field_values">
                        <div className='label'>id</div>
                        <input type="text" className='input_field' onChange={this.handleInputChange.bind(this, 'id')} />
                    </div>
                    <div className="field_values">
                        <div className='label'>Description</div>
                        <textarea className='input_field' rows="6" onChange={this.handleInputChange.bind(this, 'description')} />
                    </div>
                </div>
            </form>
            <div className="button-section">
                <button className="cancel-button" onClick={this.handleCancelSubmit.bind(this)}><span>Cancel</span></button>
                <button className="confirm-button" onClick={this.handleFormSubmit.bind(this)}><span>Confirm</span></button>
              
            </div>
        </div>
        )
    }

    handleFormSubmit() {

    }

    handleInputChange(field, ev) {
        let {fieldValues} = this.state;
        fieldValues[field] = ev.target.value;

        this.setState({
            fieldValues
        });
    }

    handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }

    selectAllPeoples() {
        let {peopleList} = this.props;
        let {peopleIds, active} = this.state;
        if (peopleIds.length > 0) {
            peopleIds = [];
            active = "0"
        } else {
            peopleList.result.People.map((people, idx) => {
                peopleIds.push(people.id)
            });
            active = peopleIds[peopleIds.length - 1]
        }
        this.handleAllPeopleCheck(true)

        this.setState({
            peopleIds,
            active
        })
    }

    selectPeople(id) {
        let {peopleIds, active} = this.state;

        if (!peopleIds.includes(id)) {
            peopleIds.push(id)
            active = peopleIds[peopleIds.length - 1]
        } else {
            peopleIds = peopleIds.filter(item => item !== id);
            active = peopleIds.length ? peopleIds[peopleIds.length - 1] : "0";
        }

        this.setState({
            peopleIds,
            active
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
    requestPeopleList: () => dispatch(getPeopleData()),
    requestRemoveData: (data) => dispatch(removePeoples(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(PeopleListContainer);