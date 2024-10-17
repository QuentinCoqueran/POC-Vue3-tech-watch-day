<template>
  <div class="container">
    <SearchInput searchLabel="Company name" v-model="companyNameSearch" :items="items"/>
    <SearchInput searchLabel="Siret" v-model="siretSearch" :items="items"/>
  </div>
</template>

<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import useInseeApi from '@/composables/useInseeApi';
import { computed, reactive, ref, watchEffect, type Ref } from 'vue';

defineOptions({
  name: 'MainView'
})

const companyNameSearch = ref('');
const siretSearch = ref('');

const data: Ref<{data: {etablissements: Record<string, unknown>[]}} | null> = ref(null);
const error = ref(null);

watchEffect(() => {
  let response = null;
  if (companyNameSearch.value.length > 0) {
    response = reactive(useInseeApi({companyName: companyNameSearch.value}));
  } else if (siretSearch.value.length > 0) {
    response = reactive(useInseeApi({siret: siretSearch.value}));
  }

  if (response) {
    data.value = response.data;
    error.value = response.error;
  }
});


const items = computed(() => {
  if (error.value || !data.value) {
    return [];
  }

  return data.value.data.etablissements.map((etablissement) => etablissement.name as string);
});

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 100px;
}

input {
  margin: 10px;
  padding: 10px;
  font-size: 16px;
}
</style>