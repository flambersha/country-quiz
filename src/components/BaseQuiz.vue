<script setup>
import Country from "./Country.vue";
import { useCountryStore } from "@/stores/countries";
import { useTimerStore } from "@/stores/timer";
import { ref, onMounted, onUnmounted } from "vue";
import confetti from "canvas-confetti";
import Loading from "./Loading.vue";

const props = defineProps({
  continentName: String,
  time: {
    type: Number,
    required: false,
    default: 300,
  },
});
const store = useCountryStore(); // filtering, counting logic
const timerStore = useTimerStore(); // timer logic

const message = ref(""); // 'guessed already' message
let messageTimeout = null;
const isCorrect = ref(false); //for input highlighting
const isHard = ref(false);
let country = null;

function checkCountryNames() {
  const guess = timerStore.userInput.trim().toLowerCase();
  if (!guess) return;
  country = null;
  //hard mode choosen
  if (isHard.value) {
    for (let j = 0; j < store.countriesCounter; j++) {
      if (store.filteredCountries[j].name.toLowerCase() === guess) {
        showTemporaryMessage(`"${store.filteredCountries[j].name}" is already guessed!`);
        return;
      }
    }

    const currentCountry = store.filteredCountries[store.countriesCounter];
    if (checkInputCountry(guess, currentCountry.name.toLowerCase())){
      country = currentCountry;
    }
    if (!country) return;

  }
  else{//default (easy) mode
    
    country = store.filteredCountries.find((c) =>
    checkInputCountry(guess, c.name.toLowerCase())
  );
  if (!country) return;

  if (country.isRevealed) {
    showTemporaryMessage(`"${country.name}" is already guessed!`);
    return;
  }
  }
  revealCountry(country);  
}

function checkInputCountry(guess, countryName){
    if (countryName === guess) return true;
    if (guess === "sao" && countryName.includes("são")) {
      return true;
    }

    const countryWords = countryName.split(" ");
    if (countryWords.length > 1) {
      const regex = new RegExp(
        `^${countryWords[0]}\\s+${countryWords[1].slice(0, 2)}`,"i");
      if (regex.test(guess)) return true;
    }
    return false;
}

function revealCountry(country) {
  country.isRevealed = true;
  timerStore.userInput = "";
  store.countriesCounter++;
  highlightInput();

  // if all countries are guessed
  if (store.countriesCounter === store.filteredCountries.length) {
    triggerWinEffects();
  }
}

//green colored input on guessed country
function highlightInput() {
  isCorrect.value = true;
  setTimeout(() => {
    isCorrect.value = false;
  }, 500);
}

//confetti on all guessed
function triggerWinEffects() {
  timerStore.stop();
  confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
}

function showTemporaryMessage(text) {
  message.value = text;

  if (messageTimeout) clearTimeout(messageTimeout);

  messageTimeout = setTimeout(() => {
    message.value = "";
    messageTimeout = null;
  }, 1000);
}

onMounted(async () => {
  timerStore.setTime(props.time);
  await store.fetchCountries(); //pass true to make an API call
});
onUnmounted(() => {
  timerStore.stop();
  timerStore.initialCounters();
});
</script>
<template>
  <div class="flex flex-col grow">
    <div class="flex flex-col items-center m-8 mb-0">
      <h2
        class="text-(--main-text) text-4xl font-[Inter] font-semibold text-center"
      >
        Countries of <span class="capitalize">{{ props.continentName }}</span>
      </h2>
      <p class="mt-10 text-(--descr-text) text-sm">
        1. Enter common country names and they will be automatically counted.
        <br />
        2. Long country name? Initials don't count, just start typing the first
        2 words. <br />
        3. Pick a difficulty level if you want, the default is "easy".
      </p>
      <div
        class="text-(--main-text) text-center border-1 border-(--main-text) rounded-[5px] p-1 mt-2"
      >
        <label for="isHard">
          <input
            type="checkbox"
            name="isHard"
            class="accent-emerald-500 checked:accent-red-400"
            v-model="isHard"
            :disabled="timerStore.isRunning"
          />
          {{ isHard ? "hard" : "easy" }}
        </label>
        <p class="text-(--main-text) text-sm italic" v-if="isHard">
          harder level implies that you guess countries in strict order: one by
          one,<br />
          you can't skip the current country
        </p>
      </div>
      <!-- Result Message -->
      <p
        v-if="!timerStore.inputEnabled && timerStore.timeTaken"
        class="text-base text-(--main-text) p-5 mt-2 border border-emerald-400 w-fit">
        You guessed {{ store.countriesCounter }} out of
        {{ store.filteredCountries.length }} countries in
        {{ timerStore.formattedTimeTaken }}
      </p>
    </div>
    <div class="sticky top-0 z-10 flex flex-row justify-center gap-5 items-center bg-(--bg) p-6 h-[90px]"
    >
      <div class="text-[28px] sm:text-4xl text-(--timer) font-sans">
        {{ timerStore.formattedTime }}
      </div>
      <div>
        <input
          v-model="timerStore.userInput"
          @input="checkCountryNames"
          type="text"
          placeholder="country name"
          class="w-40 sm:w-64 border border-gray-300 text-(--input-text) rounded-md px-1 sm:px-4 py-2 shadow-sm focus:outline-none"
          :class="{ 'bg-(--active-input) border-(--active-input)': isCorrect }"
          :disabled="!timerStore.inputEnabled"
        />
        <!-- guessed already message-->
        <p
          class="absolute top-17 text-sm font-normal text-red-500 transition-opacity duration-300"
          :class="{
            'opacity-100 visible': message,
            'opacity-0 invisible': !message,
          }"
        >
          {{ message }}
        </p>
      </div>
      <div>
        <span
          v-if="timerStore.isRunning"
          class="text-[15px] text-center text-(--main-text) inline-block mb-2 md:mb-0 mr-3 md:mr-5"
          >{{ store.countriesCounter }} /
          {{ store.filteredCountries.length }}</span
        >
        <button
          v-if="!timerStore.isRunning"
          @click="timerStore.start"
          class="px-4 py-2 bg-(--start) text-white rounded-md cursor-pointer"
        >
          Start
        </button>
        <button
          v-if="timerStore.isRunning"
          @click="timerStore.stop"
          class="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
        >
          Stop
        </button>
      </div>
    </div>
    <div class="p-4 flex justify-center">
      <Loading v-if="store.isLoading"></Loading>
      <div v-if="!store.isLoading" class="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <Country
          v-for="(country, index) in store.filteredCountries"
          :key="index"
          :flagUrl="country.flagUrl"
          :countryName="country.isRevealed ? country.name : ''"
          :isCurrent="index == store.countriesCounter && timerStore.isRunning && isHard"
        />
      </div>
    </div>
  </div>
</template>
