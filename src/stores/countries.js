import { useRoute } from 'vue-router'
import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import axios from 'axios';

export const useCountryStore = defineStore('country', () => {
    const route = useRoute()
    const countries = ref([]);
    const countriesCounter = ref(0);
    const isLoading = ref(false);

    //computed property for filtering the countries
    const filteredCountries = computed(() => {
      return isWorldQuiz() ? countries.value : countries.value.filter(country => country.continent.includes(route.name));
    });
   
    function isWorldQuiz() {
      return route.name === 'world';
    }
    function sortCountries(){
      countries.value = [...countries.value].sort(() => Math.random() - 0.5);
    }

    // retrieving countries from .json file or REST API, default is .json file
    async function fetchCountries(isApi = false) {
      try {
        isLoading.value = true;
        if (isApi) {
          await getRestCountries();
          console.log('api')
        } else {
          const response = await fetch("/countries.json");
          const data = await response.json();
          
          countries.value = data.continents.flatMap(continent =>
            continent.countries.map(country => ({
              ...country,
              continent: [continent.name.toLowerCase()],
              isRevealed: false
            }))
          );
        }
        isLoading.value=false;
      } catch (error) {
        alert("Failed to fetch countries:", error)
      }
    }
  //api retrieving
  async function getRestCountries(){
    try {
      const response = await axios.get('https://restcountries.com/v3.1/independent?status=true&fields=name,flags,continents')
      countries.value = response.data.map(e => ({
        name: e.name.common,
        flagUrl: e.flags.png,
        continent: e.continents.map(continent => continent.toLowerCase()),
        isRevealed: false
      }))
    } catch (error) {
      throw new Error("Could not retrieve countries data from REST API: ", error);
    }
}
  return { countries, countriesCounter, filteredCountries, isWorldQuiz, fetchCountries, isLoading,sortCountries}
})