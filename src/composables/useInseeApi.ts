import { useGetAxios } from '@/composables/useGetAxios';
import { watchEffect } from 'vue';

const INSEE_API_URL = 'https://svc-billing-automation.sandbox.skello.io/company_registrations?';

export default function useInseeApi(params: {companyName?: string, siret?: string}) {
  let data = null;
  let error = null;

  const fetchInseeApi = () => {
    data = null;
    error = null;

    if (params.companyName) {
      const response = useGetAxios(`${INSEE_API_URL}companyName=${params.companyName}`);
      data = response.data;
      error = response.error;
    } else if (params.siret) {
      const response = useGetAxios(`${INSEE_API_URL}shopRegistrationNumber=${params.siret}`);
      data = response.data;
      error = response.error;
    }
  };

  watchEffect(() => {
    console.log('boucle')
    fetchInseeApi();
  })

  return {
    data,
    error,
  };
}