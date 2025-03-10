<script setup lang="ts">
import {useI18nStore} from "@/store/i18n/i18nStore.ts"
import DtoPropertiesSelect from "@/components/business/entity/DtoPropertiesSelect.vue";
import {useConfigView} from "@/components/business/entity/useConfigView.ts";
import {EntityConfigView} from "@/api/__generated/model/static";
import {computed} from "vue";

const i18nStore = useI18nStore()

const entityConfigView = defineModel<EntityConfigView>({
    required: true
})

const {
    entity,
    convertedProperties,
    notConvertedProperties,
} = useConfigView(entityConfigView)

const allProperties = computed(() => {
    return [
        ...convertedProperties.value,
        ...notConvertedProperties.value,
    ]
})
</script>

<template>
    <el-form :model="entity">
        <div class="entity-business-config-part">
            <div class="title">{{ i18nStore.translate('LABEL_EntityBusiness_page') }}</div>

            <div class="checkbox-flow">
                <el-form-item prop="hasPage" :label="i18nStore.translate('LABEL_EntityBusiness_hasPage')">
                    <el-checkbox v-model="entity.hasPage"/>
                </el-form-item>
            </div>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_ListView')"
                          v-if="entity.hasPage">
                <DtoPropertiesSelect prop-name="inListView" v-model:properties="allProperties"/>
            </el-form-item>
        </div>

        <div class="entity-business-config-part">
            <div class="title">{{ i18nStore.translate('LABEL_EntityBusiness_query') }}</div>

            <div class="checkbox-flow">
                <el-form-item prop="canQuery" :label="i18nStore.translate('LABEL_EntityBusiness_canQuery')">
                    <el-checkbox v-model="entity.canQuery"/>
                </el-form-item>
                <el-form-item prop="pageCanQuery" :label="i18nStore.translate('LABEL_EntityBusiness_pageCanQuery')"
                              v-if="entity.hasPage && entity.canQuery">
                    <el-checkbox v-model="entity.pageCanQuery"/>
                </el-form-item>
                <el-form-item prop="queryByPage" :label="i18nStore.translate('LABEL_EntityBusiness_queryByPage')"
                              v-if="entity.hasPage && entity.canQuery">
                    <el-checkbox v-model="entity.queryByPage"/>
                </el-form-item>
            </div>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_Specification')">
                <DtoPropertiesSelect prop-name="inSpecification" v-model:properties="allProperties"/>
            </el-form-item>
        </div>

        <div class="entity-business-config-part">
            <div class="title">{{ i18nStore.translate('LABEL_EntityBusiness_add') }}</div>

            <div class="checkbox-flow">
                <el-form-item prop="canAdd" :label="i18nStore.translate('LABEL_EntityBusiness_canAdd')">
                    <el-checkbox v-model="entity.canAdd"/>
                </el-form-item>
                <el-form-item prop="pageCanAdd" :label="i18nStore.translate('LABEL_EntityBusiness_pageCanAdd')"
                              v-if="entity.hasPage && entity.canAdd">
                    <el-checkbox v-model="entity.pageCanAdd"/>
                </el-form-item>
            </div>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_InsertInput')"
                          v-if="entity.canAdd">
                <DtoPropertiesSelect prop-name="inInsertInput" v-model:properties="allProperties"/>
            </el-form-item>
        </div>

        <div class="entity-business-config-part">
            <div class="title">{{ i18nStore.translate('LABEL_EntityBusiness_edit') }}</div>

            <div class="checkbox-flow">
                <el-form-item prop="canEdit" :label="i18nStore.translate('LABEL_EntityBusiness_canEdit')">
                    <el-checkbox v-model="entity.canEdit"/>
                </el-form-item>
                <el-form-item prop="pageCanEdit" :label="i18nStore.translate('LABEL_EntityBusiness_pageCanEdit')"
                              v-if="entity.hasPage && entity.canEdit">
                    <el-checkbox v-model="entity.pageCanEdit"/>
                </el-form-item>
            </div>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_UpdateInput')"
                          v-if="entity.canEdit">
                <DtoPropertiesSelect prop-name="inUpdateInput" v-model:properties="allProperties"/>
            </el-form-item>
        </div>

        <div class="entity-business-config-part">
            <div class="title">{{ i18nStore.translate('LABEL_EntityBusiness_detail') }}</div>

            <div class="checkbox-flow">
                <el-form-item prop="pageCanViewDetail"
                              :label="i18nStore.translate('LABEL_EntityBusiness_pageCanViewDetail')"
                              v-if="entity.hasPage">
                    <el-checkbox v-model="entity.pageCanViewDetail"/>
                </el-form-item>
            </div>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_DetailView')">
                <DtoPropertiesSelect prop-name="inDetailView" v-model:properties="allProperties"/>
            </el-form-item>
        </div>

        <div class="entity-business-config-part">
            <div class="title">{{ i18nStore.translate('LABEL_EntityBusiness_delete') }}</div>

            <div class="checkbox-flow">
                <el-form-item prop="canDelete" :label="i18nStore.translate('LABEL_EntityBusiness_canDelete')">
                    <el-checkbox v-model="entity.canDelete"/>
                </el-form-item>
                <el-form-item prop="pageCanDelete" :label="i18nStore.translate('LABEL_EntityBusiness_pageCanDelete')"
                              v-if="entity.hasPage && entity.canDelete">
                    <el-checkbox v-model="entity.pageCanDelete"/>
                </el-form-item>
            </div>
        </div>

        <div class="entity-business-config-part">
            <div class="title">{{ i18nStore.translate('LABEL_EntityBusiness_shortAssociation') }}</div>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_OptionView')">
                <DtoPropertiesSelect prop-name="inOptionView" v-model:properties="allProperties"/>
            </el-form-item>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_ShortView')">
                <DtoPropertiesSelect prop-name="inShortAssociationView" v-model:properties="allProperties"/>
            </el-form-item>
        </div>

        <div class="entity-business-config-part">
            <div class="title">{{ i18nStore.translate('LABEL_EntityBusiness_longAssociation') }}</div>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_LongInput')">
                <DtoPropertiesSelect prop-name="inLongAssociationInput" v-model:properties="allProperties"/>
            </el-form-item>

            <el-form-item :label="i18nStore.translate('LABEL_EntityBusiness_DTO_LongView')">
                <DtoPropertiesSelect prop-name="inLongAssociationView" v-model:properties="allProperties"/>
            </el-form-item>
        </div>
    </el-form>
</template>

<style scoped>
.el-form-item {
    margin-bottom: 0.5em;
}

.entity-business-config-part {
    padding: 1em;
}

.entity-business-config-part .title {
    padding-bottom: 0.5rem;
    border-bottom: var(--border);
    margin-bottom: 0.5rem;
    font-size: var(--el-font-size-base);
    color: var(--el-color-info);
}

.checkbox-flow {
    display: flex;
    gap: 1.5em;
}
</style>
