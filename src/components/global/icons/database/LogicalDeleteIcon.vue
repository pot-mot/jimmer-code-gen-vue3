<script setup lang="ts">

import {COLUMN_ICON_COLOR} from "@/components/global/icons/database/ColumnIconColor.ts";
</script>

<template>
    <el-icon>
        <svg>
            <path :stroke="COLUMN_ICON_COLOR.LOGICAL_DELETE"
                  d="M 7 2 a 4 4 0 1 1 0 8 a 4 4 0 1 1 0 -8 m -3 1 l 6 6"
                  fill="none"/>
        </svg>
    </el-icon>
</template>