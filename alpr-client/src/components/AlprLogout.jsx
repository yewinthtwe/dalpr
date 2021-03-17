import auth from "../services/AlprAuthService";

function AlprLogout(props) {
    auth.logout();
    window.location = '/login';
    return (
        null
    );
}

export default AlprLogout;