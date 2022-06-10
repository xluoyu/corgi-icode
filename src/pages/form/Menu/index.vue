<template>
  <el-aside class="h-full w-1/6 max-w-300px bg-$theme-bg px-4">
    <el-tabs tab-position="top" class="h-full">
      <el-tab-pane :label="$t('page.components')">
        <el-scrollbar>
          <el-collapse>
            <el-collapse-item v-for="item in FormCompList" :key="item.title" :title="$t('page.' + item.title)" :name="item.title">
              <draggable :list="item.children" item-key="key" :sort="false" :group="{name: 'dragGroup', pull:'clone', put: false}" :clone="cloneItem">
                <template #item="{ element }">
                  <el-button :data-type="item.title" class="cursor-pointer">
                    {{ $t(`comps.${element.title}`) }}
                  </el-button>
                </template>
              </draggable>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane :label="$t('page.templates')">
        Config
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script lang='ts' setup>
import Draggable from 'vuedraggable'
import { data as FormCompList } from '@/enum/form'

const cloneItem = (evt) => {
  return evt
}
</script>
