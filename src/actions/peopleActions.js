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
   