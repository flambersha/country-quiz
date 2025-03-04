<script setup></script>
<template>
     <div class="mt-auto flex flex-col gap-4 items-center text-3xl">
      <div class="flex flex-col gap-3 p-14 border-3 border-emerald-500 rounded-xl text-center text-(--main-text)">
        <h1 class="font-bold">Country Quiz</h1>
        <p class="text-[20px]">Test your flags knowledge here!</p>
        <p class="text-[13px]">Created with Vue.js, tailwind.css</p>
      </div>
      <router-link to="/europe" class="underline text-[18px] text-(--main-text)">Start with European countries</router-link>
    </div>
</template>