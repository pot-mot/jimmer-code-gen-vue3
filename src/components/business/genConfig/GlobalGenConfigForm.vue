<script setup lang="ts">
import GenConfigForm from "@/components/business/genConfig/GenConfigForm.vue";
import {useGlobalGenConfigStore} from "@/store/config/GlobalGenConfigStore.ts";
import {GenConfigProperties} from "@/api/__generated/model/static";
import {api} from "@/api";
import {FormEmits} from "@/components/global/form/FormEmits.ts";

const globalGenConfigStore = useGlobalGenConfigStore()

const handleGlobalGenConfigSubmit = async (properties: GenConfigProperties) => {
	await api.configService.setConfig({body: properties})
	await globalGenConfigStore.reset()
	emits('submit', properties)
}

const emits = defineEmits<FormEmits<GenConfigProperties>>()
</script>

<template>
	<GenConfigForm
		v-if="globalGenConfigStore.isLoaded"
		v-model="globalGenConfigStore.genConfig"
		@submit="handleGlobalGenConfigSubmit"
		@cancel="emits('cancel', globalGenConfigStore.genConfig)"></GenConfigForm>
</template>
