import axios from "axios"

const Auth = () => {

    const login = async (email, password) => {

        const errorResponse = { message: '' };
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/login", {email: email, password: password})
            if (response.status == 200) {

                let data = response
                return data
            }else{
                errorResponse.message = 'No data available'
            }
        } catch (err) {
            errorResponse.message = err.message
        }

        return errorResponse
    };

    const logout = async (token) => {

        try {

            let response = await axios.post('http://127.0.0.1:8000/api/logout', { },{ headers: {"Authorization" : `Bearer ${token}`} });
            return response;
        } catch (err) {

            return err.response;
        }
    };

    const signup = async (data) => {

        try {

            let response = await axios.post('http://127.0.0.1:8000/api/users', { name: data.name, email: data.email, password: data.password });
            return response;
        } catch (err) {

            return err.response;
        }
    };

    return {
        login,
        logout,
        signup
    }
};

export default Auth;