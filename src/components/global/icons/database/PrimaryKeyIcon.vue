<script setup lang="ts">

import {COLUMN_ICON_COLOR} from "@/components/global/icons/database/ColumnIconColor.ts";
</script>

<template>
    <el-icon size="1.2em" style="transform: translateY(0.2em)">
        <svg>
            <path :stroke="COLUMN_ICON_COLOR.PRIMARY_KEY"
                  stroke-width="0.1rem"
                  d="M 4 4 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 m 3 3 l 0 6 l 3 0 m -3 -3 l 2 0"
                  fill="none"/>
        </svg>
    </el-icon>
</template>