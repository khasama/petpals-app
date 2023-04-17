import api from "../configs/axios.config";

const getPets = async (idCategory) => {
    try {
        const res = await api.get(`/pet?category=${idCategory}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getPets;