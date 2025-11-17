<script setup lang="ts">
import DragResizeDialog from "@/components/dialog/DragResizeDialog.vue";
import {useDiagnoseDialog} from "@/modelEditor/diagnostic/useDiagnoseDialog.ts";
import {useDeviceStore} from "@/store/deviceStore.ts";
import {translate} from "@/store/i18nStore.ts";
import CollapseDetail from "@/components/collapse/CollapseDetail.vue";
import {useModelEditor} from "@/modelEditor/useModelEditor.ts";
import GroupIdViewer from "@/modelEditor/viewer/GroupIdViewer.vue";
import DiagnoseViewer from "@/modelEditor/diagnostic/DiagnoseViewer.vue";
import EntityIdViewer from "@/modelEditor/viewer/EntityIdViewer.vue";
import EntityPropertyIdViewer from "@/modelEditor/viewer/property/EntityPropertyIdViewer.vue";
import MappedSuperClassIdViewer from "@/modelEditor/viewer/MappedSuperClassIdViewer.vue";
import MappedSuperClassPropertyIdViewer from "@/modelEditor/viewer/property/MappedSuperClassPropertyIdViewer.vue";
import EmbeddableTypeIdViewer from "@/modelEditor/viewer/EmbeddableTypeIdViewer.vue";
import EmbeddableTypePropertyIdViewer from "@/modelEditor/viewer/property/EmbeddableTypePropertyIdViewer.vue";
import EnumerationIdViewer from "@/modelEditor/viewer/EnumerationIdViewer.vue";
import EnumerationItemIdViewer from "@/modelEditor/viewer/property/EnumerationItemIdViewer.vue";
import AssociationIdViewer from "@/modelEditor/viewer/AssociationIdViewer.vue";
import MappedPropertyIdViewer from "@/modelEditor/viewer/property/MappedPropertyIdViewer.vue";

const {
    modelDiagnoseInfo,
    focusDiagnosticSource,
} = useModelEditor()

const {
    openState,
} = useDiagnoseDialog()

const {
    innerWidth,
    visualHeight,
} = useDeviceStore()
</script>

<template>
    <DragResizeDialog
        v-model="openState"
        :init-x="innerWidth * 0.05"
        :init-w="Math.max(innerWidth * 0.3, 240)"
        :init-y="visualHeight * 0.05"
        :init-h="visualHeight * 0.9"
        can-resize
    >
        <template #title>
            <div class="diagnose-dialog-title">
                {{ translate('diagnose_dialog_title') }}
                {{ modelDiagnoseInfo.total > 0 ? `(${modelDiagnoseInfo.total})` : '' }}
            </div>
        </template>

        <div class="diagnose-body">
            <CollapseDetail
                v-if="modelDiagnoseInfo.groupTotal > 0"
                :model-value="true"
                trigger-position="left"
            >
                <template #head>
                    {{ translate('group') }}
                    ({{ modelDiagnoseInfo.groupTotal }})
                </template>
                <template #body>
                    <template
                        v-for="[groupId, {group}] in modelDiagnoseInfo.groupMap"
                        :key="groupId"
                    >
                        <div
                            class="diagnose-item"
                            v-if="group.length > 0"
                            @click="focusDiagnosticSource({type: 'Group', id: groupId})"
                        >
                            <GroupIdViewer :id="groupId" ctrl-focus/>
                            <DiagnoseViewer :messages="group"/>
                        </div>
                    </template>
                </template>
            </CollapseDetail>

            <CollapseDetail
                v-if="modelDiagnoseInfo.entityTotal > 0"
                :model-value="true"
                trigger-position="left"
            >
                <template #head>
                    {{ translate('entity') }}
                    ({{ modelDiagnoseInfo.entityTotal }})
                </template>
                <template #body>
                    <template
                        v-for="[entityId, {entity, properties}] in modelDiagnoseInfo.entityMap"
                        :key="entityId"
                    >
                        <div
                            class="diagnose-item"
                            v-if="entity.length > 0"
                            @click="focusDiagnosticSource({type: 'Entity', id: entityId})"
                        >
                            <EntityIdViewer :id="entityId" ctrl-focus/>
                            <DiagnoseViewer :messages="entity"/>
                        </div>
                        <template
                            v-for="[propertyId, messages] in properties"
                            :key="propertyId"
                        >
                            <div
                                class="diagnose-item"
                                v-if="messages.length > 0"
                                @click="focusDiagnosticSource({type: 'EntityProperty', entityId, propertyId})"
                            >
                                <EntityPropertyIdViewer
                                    :entity-id="entityId"
                                    :id="propertyId"
                                    ctrl-focus
                                />
                                <DiagnoseViewer :messages="messages"/>
                            </div>
                        </template>
                    </template>
                </template>
            </CollapseDetail>

            <CollapseDetail
                v-if="modelDiagnoseInfo.mappedSuperClassTotal > 0"
                :model-value="true"
                trigger-position="left"
            >
                <template #head>
                    {{ translate('mappedSuperClass') }}
                    ({{ modelDiagnoseInfo.mappedSuperClassTotal }})
                </template>
                <template #body>
                    <template
                        v-for="[mappedSuperClassId, {mappedSuperClass, properties}] in modelDiagnoseInfo.mappedSuperClassMap"
                        :key="mappedSuperClassId"
                    >
                        <div
                            class="diagnose-item"
                            v-if="mappedSuperClass.length > 0"
                            @click="focusDiagnosticSource({type: 'MappedSuperClass', id: mappedSuperClassId})"
                        >
                            <MappedSuperClassIdViewer :id="mappedSuperClassId" ctrl-focus/>
                            <DiagnoseViewer :messages="mappedSuperClass"/>
                        </div>
                        <template
                            v-for="[propertyId, messages] in properties"
                            :key="propertyId"
                        >
                            <div
                                class="diagnose-item"
                                v-if="messages.length > 0"
                                @click="focusDiagnosticSource({type: 'MappedSuperClassProperty', mappedSuperClassId, propertyId})"
                            >
                                <MappedSuperClassPropertyIdViewer
                                    :mapped-super-class-id="mappedSuperClassId"
                                    :id="propertyId"
                                    ctrl-focus
                                />
                                <DiagnoseViewer :messages="messages"/>
                            </div>
                        </template>
                    </template>
                </template>
            </CollapseDetail>

            <CollapseDetail
                v-if="modelDiagnoseInfo.embeddableTypeTotal > 0"
                :model-value="true"
                trigger-position="left"
            >
                <template #head>
                    {{ translate('embeddableType') }}
                    ({{ modelDiagnoseInfo.embeddableTypeTotal }})
                </template>
                <template #body>
                    <template
                        v-for="[embeddableTypeId, {embeddableType, properties}] in modelDiagnoseInfo.embeddableTypeMap"
                        :key="embeddableTypeId"
                    >
                        <div
                            class="diagnose-item"
                            v-if="embeddableType.length > 0"
                            @click="focusDiagnosticSource({type: 'EmbeddableType', id: embeddableTypeId})"
                        >
                            <EmbeddableTypeIdViewer :id="embeddableTypeId" ctrl-focus/>
                            <DiagnoseViewer :messages="embeddableType"/>
                        </div>
                        <template
                            v-for="[propertyId, messages] in properties"
                            :key="propertyId"
                        >
                            <div
                                class="diagnose-item"
                                v-if="messages.length > 0"
                                @click="focusDiagnosticSource({type: 'EmbeddableTypeProperty', embeddableTypeId, propertyId})"
                            >
                                <EmbeddableTypePropertyIdViewer
                                    :embeddable-type-id="embeddableTypeId"
                                    :id="propertyId"
                                    ctrl-focus
                                />
                                <DiagnoseViewer :messages="messages"/>
                            </div>
                        </template>
                    </template>
                </template>
            </CollapseDetail>

            <CollapseDetail
                v-if="modelDiagnoseInfo.enumerationTotal > 0"
                :model-value="true"
                trigger-position="left"
            >
                <template #head>
                    {{ translate('enumeration') }}
                    ({{ modelDiagnoseInfo.enumerationTotal }})
                </template>
                <template #body>
                    <template
                        v-for="[enumerationId, {enumeration, items}] in modelDiagnoseInfo.enumerationMap"
                        :key="enumerationId"
                    >
                        <div
                            class="diagnose-item"
                            v-if="enumeration.length > 0"
                            @click="focusDiagnosticSource({type: 'Enumeration', id: enumerationId})"
                        >
                            <EnumerationIdViewer :id="enumerationId" ctrl-focus/>
                            <DiagnoseViewer :messages="enumeration"/>
                        </div>
                        <template
                            v-for="[itemId, messages] in items"
                            :key="itemId"
                        >
                            <div
                                class="diagnose-item"
                                v-if="messages.length > 0"
                                @click="focusDiagnosticSource({type: 'EnumerationItem', enumerationId, itemId})"
                            >
                                <EnumerationItemIdViewer
                                    :enumeration-id="enumerationId"
                                    :id="itemId"
                                    ctrl-focus
                                />
                                <DiagnoseViewer :messages="messages"/>
                            </div>
                        </template>
                    </template>
                </template>
            </CollapseDetail>

            <CollapseDetail
                v-if="modelDiagnoseInfo.associationTotal > 0"
                :model-value="true"
                trigger-position="left"
            >
                <template #head>
                    {{ translate('association') }}
                    ({{ modelDiagnoseInfo.associationTotal }})
                </template>
                <template #body>
                    <template
                        v-for="[associationId, {association, mappedProperty}] in modelDiagnoseInfo.associationMap"
                        :key="associationId"
                    >
                        <div
                            class="diagnose-item"
                            v-if="association.length > 0"
                            @click="focusDiagnosticSource({type: 'Association', id: associationId})"
                        >
                            <AssociationIdViewer :id="associationId" ctrl-focus/>
                            <DiagnoseViewer :messages="association"/>
                        </div>
                        <div
                            class="diagnose-item"
                            v-if="mappedProperty.length > 0"
                            @click="focusDiagnosticSource({type: 'MappedProperty', associationId})"
                        >
                            <MappedPropertyIdViewer :association-id="associationId" ctrl-focus/>
                            <DiagnoseViewer :messages="mappedProperty"/>
                        </div>
                    </template>
                </template>
            </CollapseDetail>
        </div>
    </DragResizeDialog>
</template>

<style scoped>
.diagnose-body {
    font-size: 0.8rem;
    padding: 0.5rem;
}

.diagnose-item {
    display: flex;
    flex-wrap: nowrap;
    line-height: 1rem;
    gap: 0.5rem;
    padding: 0.25rem 0.5rem 0.25rem 2rem;
    cursor: pointer;
}

.diagnose-item:hover {
    background-color: var(--background-color-hover);
}
</style>
