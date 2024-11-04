export const imageUrl = (imagePath: string, quality: string) => {
  const url = `https://image.tmdb.org/t/p/${quality}/${imagePath}`;

  return url;
};
