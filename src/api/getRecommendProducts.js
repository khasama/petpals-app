import api from "../configs/axios.config";

const getRecommendProducts = async (id) => {
    try {
        const res = await api.get(`/product/recommend/${id}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getRecommendProducts;