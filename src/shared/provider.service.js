import axios from 'core/http/axios';
import { API_PROVIDERS_MAP } from 'shared/api-urls';

class ProviderService {
    getApiDataForProvider = async (providerName) => {
        return new Promise((resolve, reject) => {
            try {
                axios.get(API_PROVIDERS_MAP[providerName])
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    resolve([]);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new ProviderService();