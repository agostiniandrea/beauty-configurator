import { data as users } from './../../../users/users.json';

export default (state = {}, action) => {
    switch(action.type){
        case 'USER/GET_INFO': {
            return getInfo(action.payload);
        }
        case 'USER/SET_INFO': {
            return setInfo();
        }
        default:
            return state;
    }
};

function getInfo(params){
    let data = {};
    for(let user of users){
        if (user.id == params.id) data = user;
    }
    return data;
}

function setInfo(){
    //
}