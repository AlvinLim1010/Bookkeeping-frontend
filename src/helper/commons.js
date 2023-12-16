import createStore from '../store'

function getAuthServerUrl(){
    return process.env.VUE_APP_AUTH_SERVER
}

async function setStateUser(data) {
    createStore.state.user.id = data ? data.id : null;
    createStore.state.user.username = data ? data.username : null;
    createStore.state.user.email = data ? data.email : null;
    createStore.state.user.password = data ? "***********" : null;
    createStore.state.user.joinDate = data ? data.joined_date : null;
}

async function test(data) {
    createStore.state.user.id = data
}

async function setTokens(data) {
    createStore.state.user.accessToken = data.access_token;
    createStore.state.user.refreshToken = data.refresh_token;
}

function authorizeRole(targetRole) {
    return createStore.state.user.role === targetRole;
}

export { getAuthServerUrl, authorizeRole, setStateUser, setTokens, test };