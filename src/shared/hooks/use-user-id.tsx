export const useUserId = () => {
  const userId = localStorage.getItem('userId');

  return {
    userId,
  };
}
