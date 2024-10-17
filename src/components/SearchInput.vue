<template>
  <div class="search-input">
    <div>{{ searchLabel }}</div>
    <input type="text" v-model="search" @focus="isInputFocused = true" @blur="hideDropdown" />
    <ul v-if="isDropdownVisible" class="dropdown">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  items?: string[];
  searchLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    searchLabel: 'Search',
  }
);
const search = defineModel({ type: String, default: '' })

const isInputFocused = ref(false);
const isDropdownVisible = computed(() => {
  console.log('isInputFocused', isInputFocused.value);
  console.log('props.items', props.items.length);
  return isInputFocused.value && props.items.length > 0;
});

const hideDropdown = () => {
  setTimeout(() => {
    isInputFocused.value = false;
  }, 10);
};
</script>

<style scoped>
.search-input {
  position: relative;
  width: 200px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 8px;
  cursor: pointer;
}

.dropdown li:hover {
  background: #f0f0f0;
}
</style>