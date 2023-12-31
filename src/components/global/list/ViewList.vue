<script setup generic="T extends { [key: string]: any }" lang="ts">
import {ListProps} from "@/components/global/list/ListProps.ts";
import Line from "@/components/global/list/Line.vue";
import LineItem from "@/components/global/list/LineItem.vue";

withDefaults(defineProps<ListProps<T>>(), {
	labelLine: true
})
</script>

<template>
	<div class="view-list">
		<div class="view-list-head">
			<Line v-if="labelLine" :gap="gap" :height="height">
				<LineItem v-for="column in columns" :span="column.span">
					<slot name="label">
						<el-text style="padding-left: 0.5em;" v-if="column.label">{{ column.label }}</el-text>
					</slot>
				</LineItem>
			</Line>
		</div>

		<div class="view-list-body">
			<slot name="headLines" :columns="columns" :lines="lines" :gap="gap" :height="height"></slot>

			<template v-for="data in lines">
				<slot name="line" :data="data" :columns="columns" :gap="gap" :height="height">
					<Line :gap="gap" :height="height">
						<LineItem v-for="(column, index) in columns" :span="column.span">
							<slot
								v-if="'name' in column"
								:name="column.name"
								:span="column.span"
								:prop="column.prop"
								:propData="column.prop ? data[column.prop] : undefined"
								:data="data"
								:index="index">
								<slot name="defaultNoPropItem"
									  :span="column.span"
									  :prop="column.prop"
									  :propData="column.prop ? data[column.prop] : undefined"
									  :data="data"
									  :index="index">
								</slot>
							</slot>
							<slot
								v-else
								:name="column.prop"
								:span="column.span"
								:prop="column.prop"
								:propData="column.prop ? data[column.prop] : undefined"
								:data="data"
								:index="index">
								<slot name="defaultPropItem"
									  :span="column.span"
									  :prop="column.prop"
									  :propData="column.prop ? data[column.prop] : undefined"
									  :data="data"
									  :index="index">
									<el-text>{{ column.prop ? data[column.prop] : "" }}</el-text>
								</slot>
							</slot>
						</LineItem>
					</Line>
				</slot>
			</template>

			<slot name="tailLines" :columns="columns" :lines="lines" :gap="gap" :height="height"></slot>
		</div>
	</div>
</template>
