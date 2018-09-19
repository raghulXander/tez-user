import peopleActions from '../actions/peopleActions';
import { Actions } from '../constants/actions';

const IntialState = {
    loading: false,
    result: []
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
        default: 
            return state
    }
}
