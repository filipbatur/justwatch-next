import { GenericSetter, Movie, Movies } from '@/types/global';

export const addItem = (
  item: Movie | string,
  setter: GenericSetter<string[]> | GenericSetter<Movie[]>,
  key: string,
  maxLength: number
) => {
  const currentData = localStorage.getItem(key);
  const updatedData = currentData ? JSON.parse(currentData) : [];

  updatedData.push(item);

  if (updatedData.length > maxLength) {
    updatedData.shift();
  }

  setter(updatedData);
  localStorage.setItem(key, JSON.stringify(updatedData));
};

export const removeItem = (
  id: number,
  setter: GenericSetter<Movies>,
  key: string
) => {
  const currentData = localStorage.getItem(key);
  const updatedData = currentData ? JSON.parse(currentData) : [];

  const filteredData = updatedData.filter((item: Movie) => item.id !== id);

  setter(filteredData);
  localStorage.setItem(key, JSON.stringify(filteredData));
};

export const clearData = (setter: GenericSetter<string[]>, key: string) => {
  setter([]);
  localStorage.setItem(key, JSON.stringify([]));
};
