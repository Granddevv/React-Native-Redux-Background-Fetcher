import { ADD_LOG } from '../actions';

const initialState = {
    data: []
};

const logs = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOG:
            return {
                ...state,
                data: [...state.data, action.value],
            };
        default:
            return state;
    }
};

export default logs;
