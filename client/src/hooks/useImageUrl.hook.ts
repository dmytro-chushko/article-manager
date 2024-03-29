export const useImageUrl = (imageUrl?: string) => {
  return imageUrl && imageUrl.split('.').length > 2
    ? imageUrl
    : `${import.meta.env.VITE_BASE_URL}/${imageUrl}`;
};
