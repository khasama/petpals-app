import api from "../configs/axios.config";
import queryString from 'query-string';

const getProducts = async (idItem, idSubitem, limit, page, sort) => {
    try {
        let query = {};
        if (idItem) query = { ...query, ...{ item: idItem } };
        if (idSubitem || idSubitem != 0) query = { ...query, ...{ subitem: idSubitem } };
        if (limit) query = { ...query, ...{ limit } };
        if (page) query = { ...query, ...{ page } };
        if (sort) {
            if (sort == 0) {
                query = { ...query, ...{ latest: '1' } };
            }
            if (sort == 1) {
                query = { ...query, ...{ latest: '0' } };
            }
            if (sort == 2) {
                query = { ...query, ...{ price: 'asc' } };
            }
            if (sort == 3) {
                query = { ...query, ...{ price: 'desc' } };
            }
        }
        const res = await api.get(`/product?${queryString.stringify(query)}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getProducts;