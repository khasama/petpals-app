import api from "../configs/axios.config";

const register = async (email, password) => {
    try {
        const res = await api.post(`/auth/register`, { email, password });
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default register;