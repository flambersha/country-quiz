<script setup>
    const props= defineProps({
        flagUrl:{
            type:String,
            required:true
        },
        countryName: {
            type: String,
            required: true
    },
    isCurrent: {
        type:Boolean,
        default:false
    }
    })
</script>
<template>
    <div class="rounded-2xl border border-(--c-border) p-4 flex flex-col items-center text-center w-55 shadow-md">
        <img :src="flagUrl" alt="flag" class="w-fit h-30 rounded-md border-2 border-(--c-border) mb-[10px]" />
        <div class="flex items-center justify-center h-6 leading-none text-center w-50 text-(--c-name) border-2 border-(--c-border) rounded transition-colors duration-500"
        :class="isCurrent ? 'bg-yellow-200' : 'bg-transparent'"
>  {{ countryName }}
</div>
    </div>
</template>