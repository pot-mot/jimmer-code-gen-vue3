<script setup lang="ts">
import Dropdown from "@/components/dropdown/Dropdown.vue";
import {
    exitIdProperty,
    exitVersionProperty, isKeyProperty, isLogicalDeleteProperty, isMayKeyProperty, isMayLogicalDeleteProperty,
    toggleKeyProperty,
    toggleLogicalDeleteProperty,
    toIdProperty, toVersionProperty
} from "@/modelEditor/node/property/PropertyConvert.ts";
import {computed} from "vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import IconBusinessKey from "@/components/icons/modelEditor/IconBusinessKey.vue";
import IconVersion from "@/components/icons/modelEditor/IconVersion.vue";
import IconPrimaryKey from "@/components/icons/modelEditor/IconPrimaryKey.vue";
import IconForeignKey from "@/components/icons/modelEditor/IconForeignKey.vue";
import IconLogicalDelete from "@/components/icons/modelEditor/IconLogicalDelete.vue";

const property = defineModel<EntityProperty | MappedSuperClassProperty>({
    required: true
})

const propertyIsId = computed(() => {
    return property.value.category === "ID_COMMON" || property.value.category === "ID_EMBEDDABLE"
})
const propertyMayKey = computed(() => {
    return isMayKeyProperty(property.value)
})
const propertyIsKey = computed(() => {
    return isKeyProperty(property.value)
})
const propertyMayLogicalDeleted = computed(() => {
    return isMayLogicalDeleteProperty(property.value)
})
const propertyIsLogicalDeleted = computed(() => {
    return isLogicalDeleteProperty(property.value)
})
const propertyIsVersion = computed(() => {
    return property.value.category === "VERSION"
})
const propertyIsForeignKey = computed(() => {
    return property.value.category === "ManyToOne" || property.value.category === "OneToOne_Source"
})

const {
    executeAsyncBatch,
    remove,
} = useModelEditor()

const cleanPropertyReference = () => {
    if ("associationId" in property.value) {
        remove({associationIds: [property.value.associationId]})
    }
}

const toggleId = () => {
    executeAsyncBatch(Symbol("property toggle id"), async () => {
        if (property.value.category === "ID_COMMON" || property.value.category === "ID_EMBEDDABLE") {
            property.value = exitIdProperty(property.value)
        } else {
            cleanPropertyReference()
            property.value = toIdProperty(property.value)
        }
    })
}

const toggleKey = () => {
    executeAsyncBatch(Symbol("property toggle key"), async () => {
        if (isMayKeyProperty(property.value)) {
            property.value = toggleKeyProperty(property.value)
        }
    })
}

const toggleLogicalDelete = () => {
    executeAsyncBatch(Symbol("property toggle logicalDeleted"), async () => {
        if (isMayLogicalDeleteProperty(property.value)) {
            property.value = toggleLogicalDeleteProperty(property.value)
        }
    })
}

const toggleVersion = () => {
    executeAsyncBatch(Symbol("property toggle version"), async () => {
        if (property.value.category === "VERSION") {
            property.value = exitVersionProperty(property.value)
        } else {
            cleanPropertyReference()
            property.value = toVersionProperty(property.value)
        }
    })
}
</script>

<template>
    <Dropdown>
        <template #head>
            <div class="category-editor-header">
                <IconPrimaryKey v-if="propertyIsId"/>
                <IconForeignKey v-if="propertyIsForeignKey"/>
                <IconVersion v-if="propertyIsVersion"/>
                <IconBusinessKey v-if="propertyIsKey"/>
                <IconLogicalDelete v-if="propertyIsLogicalDeleted"/>
            </div>
        </template>

        <template #body>
            <div
                class="category-option"
                :class="{selected: propertyIsId}"
                @click="toggleId"
            >
                <IconPrimaryKey/>
                ID
            </div>
            <div
                class="category-option"
                v-if="propertyIsForeignKey"
                :class="{selected: propertyIsForeignKey, disabled: true}"
            >
                <IconForeignKey/>
                ForeignKey
            </div>
            <div
                class="category-option"
                :class="{selected: propertyIsVersion}"
                @click="toggleVersion"
            >
                <IconVersion/>
                Version
            </div>
            <div
                class="category-option"
                :class="{selected: propertyIsKey, disabled: !propertyMayKey}"
                @click="toggleKey"
            >
                <IconBusinessKey/>
                Key
            </div>
            <div
                class="category-option"
                :class="{selected: propertyIsLogicalDeleted, disabled: !propertyMayLogicalDeleted}"
                @click="toggleLogicalDelete"
            >
                <IconLogicalDelete/>
                LogicalDelete
            </div>
        </template>
    </Dropdown>
</template>

<style scoped>
.category-editor-header {
    height: 2rem;
    font-size: 0.8rem;
    line-height: 2rem;
    padding-left: 0.5rem;
    min-width: 1.5rem;
}

.category-option {
    padding: 0.1rem 0.5rem;
    cursor: pointer;
    background-color: var(--background-color);
}

.category-option:hover {
    background-color: var(--background-color-hover);
}

.category-option.selected {
    background-color: var(--primary-color-background);;
}

.category-option.disabled {
    opacity: 0.8;
    cursor: not-allowed;
}
</style>
