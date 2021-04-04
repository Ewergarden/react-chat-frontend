import {combineReducers} from 'redux';

const reducers = ['dialogReduser', 'userReducer','MessageReducer','Attachments']

export default combineReducers(
    reducers.reduce((initial,name) => {
            initial[name] = require(`./${name}`).default
            return initial
    }, {})


)