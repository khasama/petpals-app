import api from "../configs/axios.config";
import queryString from 'query-string';

const getPets = async (idCategory, idSubcategory, limit, page, sort) => {
    try {
        let query = {};
        if (idCategory) query = { ...query, ...{ category: idCategory } };
        if (idSubcategory || idSubcategory != 0) query = { ...query, ...{ subcategory: idSubcategory } };
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
        const res = await api.get(`/pet?${queryString.stringify(query)}`);
        if (res.status == 200) {
            const result = res.data;
            return result;
        }
    } catch (error) {
        throw error;
    }
}

export default getPets;