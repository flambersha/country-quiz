<script setup>
    const props= defineProps({
        flagUrl:{
            type:String,
            required:true
        },
        countryName: {
            type: String,
            required: true
    }
    })
</script>
<template>
    <div class="rounded-2xl border border-(--c-border) p-4 flex flex-col items-center text-center w-75 shadow-md">
        <img :src="flagUrl" alt="flag" class="w-fit h-40 rounded-md border-1 border-emerald-700 mb-[10px]" />
        <div class=" flex items-center justify-center bg-transparent h-8 leading-none text-center w-60 text-(--c-name) border border-gray-400 rounded transition-colors duration-500"
>  {{ countryName }}
</div>
    </div>
</template>