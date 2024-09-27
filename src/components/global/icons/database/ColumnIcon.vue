<script lang="ts" setup>
import {ElIcon} from "element-plus";
import {GenColumnView} from "@/api/__generated/model/static";
import {COLUMN_ICON_COLOR} from "@/components/global/icons/database/ColumnIconColor.ts";

interface DataSourceIconProps {
	column: Partial<GenColumnView>
}

defineProps<DataSourceIconProps>()
</script>

<template>
    <el-icon size="1.2em" style="transform: translateY(0.3em);">
        <svg fill="none" stroke-linecap="round"
             stroke-linejoin="round"
             stroke-width="1.5" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">

            <path :stroke="column.typeNotNull ? COLUMN_ICON_COLOR.NOT_NULL : COLUMN_ICON_COLOR.COMMON"
                  d="M3 3m0 1a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1h-16a1 1 0 01-1-1zm6-1v18"
                  fill="none"/>

            <!-- https://tablericons.com/ key -->
            <path v-if="column.partOfPk"
                  :stroke="COLUMN_ICON_COLOR.PRIMARY_KEY"
                  stroke-width="0.1rem"
                  d="M 15 14 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 m 3 3 l 0 6 l 3 0 m -3 -3 l 2 0"
                  fill="none"/>

            <path v-if="column.partOfPk && column.autoIncrement"
                  :stroke="COLUMN_ICON_COLOR.PRIMARY_KEY"
                  stroke-width="0.1rem"
                  d="M 20 10 v -6 m -3 3 h 6"
                  fill="none"/>

            <!-- https://tablericons.com/ key -->
            <path v-if="column.businessKey"
                  :stroke="COLUMN_ICON_COLOR.BUSINESS_KEY"
                  d="M 15 14 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 m 3 3 l 0 6 l 3 0 m -3 -3 l 2 0"
                  fill="none"/>

            <!-- https://tablericons.com/ key -->
            <path v-if="column.logicalDelete"
                  :stroke="COLUMN_ICON_COLOR.LOGICAL_DELETE"
                  d="M 6 14 a 4 4 0 1 1 0 8 a 4 4 0 1 1 0 -8 m -3 1 l 6 6"
                  fill="none"/>
        </svg>
    </el-icon>
</template>
