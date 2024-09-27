<script setup lang="ts">
import {COLUMN_ICON_COLOR} from "@/components/global/icons/database/ColumnIconColor.ts";
</script>

<template>
    <el-icon>
        <svg>
            <path :stroke="COLUMN_ICON_COLOR.PRIMARY_KEY"
                  stroke-width="0.1rem"
                  d="M 6 8 v -6 m -3 3 h 6"
                  fill="none"/>
        </svg>
    </el-icon>
</template>