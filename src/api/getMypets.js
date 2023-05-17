import api from "../configs/axios.config";

const getMypets = async (id) => {
    try {
        const res = await api.get(`/pet/my-pet/${id}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getMypets;