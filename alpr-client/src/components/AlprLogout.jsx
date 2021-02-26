import auth from "../services/AlprAuthService";

function AlprLogout(props) {
    console.log('AlprLogout: trigerred.');
    auth.logout();
    window.location = '/login';
    return (
        null
    );
}

export default AlprLogout;