import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import store from '@/store';

// Crie uma instância Axios personalizada
const apiInterceptorInstance: AxiosInstance = axios.create({
  baseURL: 'https://invicta-api.addlog.com.br', // Substitua pela URL da sua API
});

// Interceptor para solicitações
apiInterceptorInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const state = store.getState();
    const token = state.auth.session.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Realize as ações de interceptação aqui, se necessário
    // Por exemplo, você pode adicionar headers personalizados
    //config.headers['Authorization'] = 'Bearer seu-token-aqui';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Interceptor para respostas
apiInterceptorInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Realize as ações de interceptação na resposta aqui, se necessário
    return response;
  },
  (error) => {
    // Lidar com erros de resposta aqui, se necessário
    return Promise.reject(error);
  }
);

export default apiInterceptorInstance;
