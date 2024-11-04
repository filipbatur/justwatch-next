export const imageUrl = (imagePath: string, quality: string) => {
  const url = `https://image.tmdb.org/t/p/${quality}/${imagePath}`;

  return url;
};

export const movieYear = (releaseDate: string) => {
  const date = new Date(releaseDate);

  if (releaseDate) {
    return date.getFullYear();
  } else {
    return 'Year unknown';
  }
};

export const movieRuntime = (runtime: number) => {
  const totalMinutes = runtime;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};
