import api from "../configs/axios.config";
import queryString from 'query-string';

const getPets = async (idCategory, idSubcategory, limit, page) => {
    try {
        let query = {};
        if (idCategory) query = { ...query, ...{ category: idCategory } };
        if (idSubcategory || idSubcategory != 0) query = { ...query, ...{ subcategory: idSubcategory } };
        if (limit) query = { ...query, ...{ subcategory: limit } };
        if (page) query = { ...query, ...{ subcategory: page } };
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