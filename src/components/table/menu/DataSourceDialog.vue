<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { api } from "../../../api";
import { GenDataSourceInput, GenDataSourceView } from "../../../api/__generated/model/static";
import {DataSourceType} from "../../../api/__generated/model/enums";
import DragResizeBox from "../../common/DragResizeBox.vue";

const dataSourceTypes = ref<DataSourceType[]>([])

onMounted(() => {
    api.dataSourceService.listTypes().then(res => {
		dataSourceTypes.value = res
	})
})

interface DataSourceDialogProps {
    id?: number,
    dataSource: Partial<GenDataSourceInput>
}

const props = defineProps<DataSourceDialogProps>()

interface SchemaItemEmits {
    (event: "save", dataSource: GenDataSourceView): void
    (event: "edit"): void
    (event: "close"): void
}

const defaultDataSource: GenDataSourceInput = {
    name: "dataSource",
    host: "127.0.0.1",
    port: "3306",
    orderKey: 0,
    username: "",
    password: "",
    remark: "",
    type: "MYSQL"
}

const dataSource = ref<GenDataSourceInput>({
    ...defaultDataSource
})

watch(() => props.dataSource, () => {
    Object.assign(dataSource.value, { ...props.dataSource })
}, { immediate: true })

const emits = defineEmits<SchemaItemEmits>()

const test = () => {
    api.dataSourceService.test({
        body: dataSource.value
    }).then(res => {
        if (res) {
            alert("测试成功")
        } else {
            alert("测试失败")
        }
    })
}

const submit = () => {
    if (props.id) {
        api.dataSourceService.edit({
            id: props.id,
            body: dataSource.value
        }).then(count => {
            if (count == 1) {
                emits("edit")
            }
        })
    } else {
        api.dataSourceService.insert({
            body: dataSource.value
        }).then(id => {
            api.dataSourceService.get({ id }).then(res => {
                if (res.length > 0) {
                    emits("save", res[0])
                }
            })
        })
    }
}

const close = () => {
    emits("close")
}
</script>

<template>
    <Teleport to="body">
        <DragResizeBox style="background-color: #fff;">
            <button @click="close">x</button>
            <input v-model="dataSource.name">
            <input v-model="dataSource.host">
            <input v-model="dataSource.port">
            <input v-model="dataSource.username">
            <input v-model="dataSource.password">
            <select v-model="dataSource.type">
                <option v-for="(type) in dataSourceTypes" :value="type">{{ type }}</option>
            </select>
            <input v-model="dataSource.remark">
            <button @click="test">测试</button>
            <button @click="submit">提交</button>
        </DragResizeBox>
    </Teleport>
</template>