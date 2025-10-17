<script setup lang="ts">
const data = defineModel<{foreignKeyType: ForeignKeyType}>({
    required: true
})

// 切换 ForeignKeyType
const toggleForeignKeyType = () => {
    if (data.value.foreignKeyType === "REAL") {
        data.value.foreignKeyType = "FAKE"
    } else {
        data.value.foreignKeyType = "REAL"
    }
}
</script>

<template>
    <div style="display: flex; justify-content: center;">
        <button @click="toggleForeignKeyType">
            {{ data.foreignKeyType === 'REAL' ? "[REAL]" : "[FAKE]" }}
        </button>
    </div>
</template>
