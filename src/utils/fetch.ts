import { FetchOptions } from '@/types/global';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchData(
  endpoint: string,
  queryParams: FetchOptions = {}
) {
  // Helper function to convert query params object to a query string
  const buildQueryString = (params: FetchOptions) =>
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');

  // Append the query string to the endpoint
  const queryString = buildQueryString(queryParams);
  const url = `${BASE_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
      }
    });

    const data = await response.json();
    return { data };
  } catch (error) {
    return { data: undefined, error };
  }
}
