import axios from "axios"

const Chat = () => {

    const userChat = async (token) => {

        try {

            let response = await axios.get('http://127.0.0.1:8000/api/chat',{ headers: {"Authorization" : `Bearer ${token}`} });
            return response;
        } catch (err) {

            return err.response;
        }
    };

    const sendMessage = async (token, partner, message) => {

        try {

            let response = await axios.post('http://127.0.0.1:8000/api/chat', { partner : partner, message: message },{ headers: {"Authorization" : `Bearer ${token}`} });
            if(response.status == 200){

                localStorage.removeItem('dynoAuthRefreshToken')
                localStorage.removeItem('dynoAuthToken')
                localStorage.removeItem('username')
            }

            return response;
        } catch (err) {

            return err.response;
        }
    };

    return {
        userChat,
        sendMessage
    }
};

export default Chat;