<template>
  <el-aside class="h-full w-1/6 max-w-300px bg-$theme-bg px-4">
    <el-tabs tab-position="top" class="h-full">
      <el-tab-pane :label="$t('page.components')">
        <el-scrollbar>
          <el-collapse>
            <el-collapse-item v-for="item in compList" :key="item.title" :title="$t('page.' + item.title)" :name="item.title">
              <draggable :list="item.children" item-key="type" :sort="false" :clone="cloneFn" :group="{name: 'dragGroup', pull:'clone', put: false}" class="flex justify-between flex-wrap">
                <template #item="{ element }">
                  <div class="cursor-pointer w-[48%] mb-3 flex justify-start items-center border border-$el-border-color py-1 px-2 rounded-md hover:(border-$el-color-primary text-$el-color-primary)">
                    <component :is="element.icon" class="mr-2 text-$el-color-primary" />
                    {{ $t(`comps.${element.title}`) }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane :label="$t('page.templates')">
        <el-scrollbar>
          <div v-for="item in TemplateList" :key="item.key" class="cursor-pointer mb-3 text-center border border-$el-border-color py-1 px-2 rounded-md hover:(border-$el-color-primary text-$el-color-primary)" @click="renderTemplate(item)">
            <el-popover placement="right" width="600px" :offset="20" :show-after="500">
              <template #reference>
                <div>
                  <img :src="item.photo" alt="" class="object-cover max-h-200px mx-auto">
                  {{ item.title }}
                </div>
              </template>
              <img :src="item.photo" alt="">
            </el-popover>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script lang='ts' setup>
import Draggable from 'vuedraggable'
import { cloneDeep } from 'lodash'
import { GetCompList, TemplateList } from '@/enum/form'
import type { ITemplateOptions } from '@/enum/form/type'
import { ProvideFormGroup } from '@/composables/designer'
// import { ElMessageBox } from 'element-plus';
const compList = GetCompList()
let uuId = 0

const formGroup = inject(ProvideFormGroup)!

const cloneFn = (item: any) => {
  const newObj = cloneDeep(item)
  const key = `${item.type}_${uuId}`
  newObj.key = key
  delete newObj.icon
  if (newObj.form._key) {
    newObj.form._key.value = key
  }
  uuId++
  return newObj
}

const renderTemplate = (item: ITemplateOptions) => {
  ElMessageBox.confirm(
    `是否使用${item.title}替换当前配置?`,
  ).then(() => {
    Object.keys(item.formOptions).forEach((key) => {
      formGroup.updateFormOptions({ key, value: item.formOptions[key].value })
    })
    formGroup.widgetList.value = item.widgetList
  }).catch(() => {})
}
</script>
