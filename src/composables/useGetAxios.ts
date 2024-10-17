import { ref, toValue, watchEffect, type Ref } from 'vue';
import axios, { AxiosError, type AxiosResponse } from 'axios';

export function useGetAxios(url: string): { data: Ref<null | AxiosResponse>; error: Ref<null | AxiosError> } {
  const data = ref<null | AxiosResponse>(null);
  const error = ref<null | AxiosError>(null);

  const fetchData = async () => {
    data.value = null;
    error.value = null;

    try {
      console.log('URL', toValue(url));
      const response = await axios.get(toValue(url));
      data.value = response.data;
    } catch (err) {
      error.value = err as AxiosError;
    } finally {
    }
  };

  watchEffect(() => {
    fetchData()
  })

  return {
    data,
    error,
  };
}