/**
 * Formata uma data para o formato DD/MM/YYYY HH:MMh
 * @param {string|Date} date - Data a ser formatada
 * @returns {string} Data formatada
 */
export const formatDateTime = (date) => {
    return new Date(date).toLocaleString('pt-PT', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      second: undefined
    }).replace(',', '') + 'h';
  };
  
  /**
   * Formata uma data mostrando apenas hora e minuto
   * @param {string|Date} date - Data a ser formatada
   * @returns {string} Hora formatada
   */
  export const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) + 'h';
  };