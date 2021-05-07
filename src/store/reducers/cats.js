import { UPDATE_CATS, REMOVE_CAT } from '../actions';

const initialState = {
    data: []
};

const cats = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CATS:
            return {
                ...state,
                data: action.value,
            };
        case REMOVE_CAT:
            const updatedData = state.data.filter(item => item.id !== action.value);
            return {
                ...state,
                data: updatedData
            }
        default:
            return state;
    }
};

export default cats;
