import api from "../configs/axios.config";

const getRecommendPets = async (id) => {
    try {
        const res = await api.get(`/pet/recommend/${id}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getRecommendPets;