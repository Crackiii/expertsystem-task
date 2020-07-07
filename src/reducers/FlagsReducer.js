const initialState = {
    formData: {
        flag_type: '',
        flag_name: '',
        flag_tag: '',
        flag_date: '',
        flag_color: '',
        flag_cats: []
    },
    flags: {
        'job': {
            title: 'Job',
            categories: [],
            items: [],
            tranformed: []
        },
        'loan cars': {
            title: 'Loan Cars',
            categories: [],
            items: [],
            tranformed: []
        },
        'tasks': {
            title: 'Tasks',
            categories: [],
            items: [],
            tranformed: []
        }
    }
}
const FlagsReducer = (state = initialState, action) => {
    console.log("REDUX STORE : ", state)
    switch (action.type) {
        case 'FORM_SUBMITTED': {
            return {
                ...state,
                formData: {
                    ...action.payload
                }
            }
        }
        case 'UPDATE_FLAGS': {
            return {
                ...state,
                flags: {
                    ...action.payload
                }
            }
        }
        default:
    }
    return state;
}

export default FlagsReducer