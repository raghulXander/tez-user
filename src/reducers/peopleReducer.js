import peopleActions from '../actions/peopleActions';
import { Actions } from '../constants/actions';
import _ from 'lodash';

const IntialState = {
    loading: false,
    result: null
}

export default (state = IntialState, action) => {
    switch (action.type) {
        case Actions.GET_PEOPLE_LIST_REQUEST :
            return {
                loading: true
            }
        case Actions.GET_PEOPLE_LIST_SUCCESS :
            return {
                loading: false,
                result: action.payload.data
            }
        case Actions.GET_PEOPLE_LIST_ERROR :
            return {
                loading: false,
                result: action.payload.err
            }
        case Actions.REMOVE_PEOPLE_REQUEST :
            return {
                loading: true
            }
        case Actions.REMOVE_PEOPLE_SUCCESS :
            return {
                loading: false,
                result: action.payload
            }
        default: 
            return state
    }
}
