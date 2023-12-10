import createStore from '../store'

function getAuthServerUrl(){
    return process.env.VUE_APP_AUTH_SERVER
}

async function setStateUser(data) {
    createStore.state.user.id = data.id
    createStore.state.user.role = data.user_metadata.role;
    createStore.state.user.username = data.username;
    createStore.state.user.accessToken = data.access_token;
    createStore.state.user.refreshToken = data.refresh_token;
    createStore.state.user.userLog = true;
    createStore.state.user.authValidated = true;
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