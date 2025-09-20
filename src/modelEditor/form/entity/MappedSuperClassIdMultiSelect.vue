<script setup lang="ts">
import Dropdown from "@/components/dropdown/Dropdown.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import MappedSuperClassViewer from "@/modelEditor/viewer/MappedSuperClassViewer.vue";

const mappedSuperClassIds = defineModel<string[]>({
    required: true
})

const {contextData} = useModelEditor()

const toggleSelect = (id: string) => {
    const index = mappedSuperClassIds.value.findIndex(it => it === id)
    if (index !== -1) {
        mappedSuperClassIds.value.splice(index, 1)
    } else {
        mappedSuperClassIds.value.push(id)
    }
}
</script>

<template>
    <Dropdown>
        <template #head>
            <div v-for="id in mappedSuperClassIds">
                <MappedSuperClassViewer
                    v-if="contextData?.mappedSuperClassMap.has(id)"
                    :mapped-super-class="contextData?.mappedSuperClassMap.get(id)!"
                    :key="id"
                />
            </div>
        </template>
        <template #body>
            <div
                v-for="[id, mappedSuperClass] in contextData?.mappedSuperClassMap ?? []"
                @click="toggleSelect(id)"
                :class="{selected: mappedSuperClassIds.includes(id)}"
            >
                <MappedSuperClassViewer
                    :mapped-super-class="mappedSuperClass"
                    :key="id"
                />
            </div>
        </template>
    </Dropdown>
</template>
