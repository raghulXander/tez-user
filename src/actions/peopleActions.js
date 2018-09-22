//src/actions/peopleAction.js
import axios from 'axios';

import {Actions} from '../constants/actions';

export const getPeopleRequest = () => dispatch => {
    dispatch({
        type: Actions.GET_PEOPLE_LIST_REQUEST,
    })
}

export const getPeopleListSuccess = (data) => dispatch => {
    dispatch({
        type: Actions.GET_PEOPLE_LIST_SUCCESS,
        payload: {
            data
        }
    })
}

export const getPeopleListError = (err) => dispatch => {
    dispatch({
        type: Actions.GET_PEOPLE_LIST_ERROR,
        payload: {
            err
        }
    })
}

export const removePeoplesRequest = (data) => dispatch => {
    dispatch({
        type: Actions.REMOVE_PEOPLE_REQUEST,
        payload: {
            loading: true
        }
    })
}

export const removePeopleSuccess = (data) => dispatch => {
    dispatch({
        type: Actions.REMOVE_PEOPLE_SUCCESS,
        payload: {
            People: data
        }
    })
}

export const requestAddNewPeople = (err) => dispatch => {
    dispatch({
        type: Actions.ADD_NEW_PEOPLE_REQUEST,
        payload: {
            loading: true
        }
    })
}

export const addNewPeopleSuccess = (data) => dispatch => {
    dispatch({
        type: Actions.ADD_NEW_PEOPLE_SUCCESS,
        payload: {
            People: data
        }
    })
}

export const addNewPeopleError = (err) => dispatch => {
    dispatch({
        type: Actions.ADD_NEW_PEOPLE_REQUEST_ERROR,
        payload: {
            err
        }
    })
}

export const removePeopleError = (err) => dispatch => {
    dispatch({
        type: Actions.REMOVE_PEOPLE_ERROR,
        payload: {
            err
        }
    })
}

export const removePeoples = (data) => dispatch => {
    dispatch(removePeoplesRequest);
    axios.get(Actions.API_URL)
    .then(res => {
        let result = res.data.People.filter(f => !data.includes(f.id));
        dispatch(removePeopleSuccess(result));
        
    })
    .catch(err => {
        dispatch(removePeopleError(err));
    })
}

export const addNewPeople = (data) => (dispatch, getState) => {
    dispatch(requestAddNewPeople);
    let newData = [data]
    console.log(newData)

    if (getState().peopleReducer.result.People.length > 0) {
        let data = [...getState().peopleReducer.result.People, ...newData]
        dispatch(addNewPeopleSuccess(data));
    } else {
        dispatch(addNewPeopleSuccess(newData));
    }
}

export const getPeopleData = () => dispatch => {
    dispatch(getPeopleRequest);
    axios.get(Actions.API_URL)
    .then(res => {
        dispatch(getPeopleListSuccess(res.data));
    })
    .catch(err => {
        dispatch(getPeopleListError(err));
    })
}
   