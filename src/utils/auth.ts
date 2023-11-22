// Função para salvar o token JWT no Local Storage
export const saveAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Função para recuperar o token JWT do Local Storage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Função para remover o token JWT do Local Storage
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};
