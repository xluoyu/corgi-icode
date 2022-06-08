<template>
  <el-aside class="h-full w-1/6 max-w-300px bg-$theme-bg px-4">
    <el-tabs tab-position="top" class="h-full">
      <el-tab-pane :label="$t('comps')">
        <el-scrollbar>
          <el-collapse>
            <el-collapse-item v-for="item in FormCompList" :key="item.title" :title="$t(item.title)" :name="item.title">
              <draggable :list="item.children" item-key="key" :group="{name: item.title, pull:true, put: false}">
                <template #item="{ element }">
                  <div class="cursor-pointer ">
                    {{ $t(element.title) }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane :label="$t('templates')">
        Config
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script lang='ts' setup>
import Draggable from 'vuedraggable'
import FormCompList from '@/enum/form'

console.log(FormCompList)
</script>
