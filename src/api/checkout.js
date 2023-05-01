import api from "../configs/axios.config";

const checkout = async ({ idUser, paymentMethod, fullName, email, address, phone }) => {
    try {
        const res = await api.post(`/checkout`, { idUser, paymentMethod, fullName, email, address, phone });
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default checkout;