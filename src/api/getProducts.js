import api from "../configs/axios.config";

const getProducts = async () => {
    try {
        const res = await api.get(`/product`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getProducts;