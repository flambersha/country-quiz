import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useCountryStore } from './countries';

export const useTimerStore = defineStore('timer', () => {
    //timer logic
    const timeLeft = ref(null);
    const originalTime = ref(null);
    const intervalId = ref(null);
    const isRunning = ref(false);
    const timeTaken = ref(null);
    const startTime = ref(null);
    //input logic
    const userInput = ref('');
    const inputEnabled = ref(false);

    const countryStore = useCountryStore();


    //receiving time from BaseQuiz props
    const setTime = (time) => {
        timeLeft.value = time;
    }
    //formatting time as mm:ss
    function formatTime(time){
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
    const formattedTime = computed(() => formatTime(timeLeft.value));
    const formattedTimeTaken = computed(()=>{
        if(timeTaken.value === null) return "--:--";
        return formatTime(Math.floor(timeTaken.value / 1000));
    })
    
    //starting the timer, enabling the input field
    function start(){
        if(!isRunning.value){
        initialCounters();

        inputEnabled.value = true;
        startTime.value = Date.now();
        originalTime.value = timeLeft.value;

        isRunning.value =true;
        intervalId.value = setInterval(() => {
                if (timeLeft.value > 0) {
                    timeLeft.value--;
                } else {
                    stop();
                }
            }, 1000)
        }
    }
    //stopping the timer, counting timeTaken value
    function stop(){
        if(intervalId.value){
            if(startTime.value !== null){
                timeTaken.value = Date.now() - startTime.value;
                startTime.value = null;
            }
            isRunning.value=false;
            clearInterval(intervalId.value);
            intervalId.value = null;

            timeLeft.value = originalTime.value;
            inputEnabled.value = false;
            userInput.value = null;

            window.scrollTo({ top: 0, behavior: 'smooth' });
            hideAll();
        }
    }
    //going back to initial values 
    function hideAll(){
        countryStore.filteredCountries.forEach((country) => {
            country.isRevealed = false;
        })
    }
    function initialCounters(){
        countryStore.countriesCounter = 0;
        timeTaken.value = null;
    }

    return { originalTime, timeLeft, formatTime, formattedTime, timeTaken, formattedTimeTaken, isRunning, setTime, start, stop, initialCounters, userInput, inputEnabled };
});