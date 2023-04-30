import api from "../configs/axios.config";

const getPet = async (id) => {
    try {
        const res = await api.get(`/pet/${id}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getPet;