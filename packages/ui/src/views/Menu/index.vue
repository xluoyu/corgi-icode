<template>
  <el-aside id="menu" class="h-full w-300px bg-$theme-bg pr-2 relative">
    <el-tabs tab-position="left" class="h-full aside-tabs">
      <el-tab-pane>
        <template #label>
          <GgTemplate />
        </template>
        <h3 class="text-base py-2 text-$el-color-primary">
          模板
        </h3>
        <el-scrollbar>
          <div
            v-for="item in templateList"
            :key="item.key"
            class="cursor-pointer mb-3 text-center border border-$el-border-color py-1 px-2 rounded-md hover:border-$el-color-primary hover:text-$el-color-primary"
            @click="renderTemplate(item)"
          >
            <el-popover
              placement="right"
              :offset="20"
              width="500"
              :show-after="500"
            >
              <template #reference>
                <div>
                  <img
                    :src="item.photo"
                    alt=""
                    class="object-cover w-full h-160px mx-auto block"
                  >
                  {{ item.title }}
                </div>
              </template>
              <img :src="item.photo" alt="" class="mx-auto w-[800px]">
            </el-popover>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane lazy>
        <template #label>
          <GgComponents />
        </template>
        <h3 class="text-base py-2 text-$el-color-primary">
          组件
        </h3>
        <el-scrollbar>
          <el-collapse
            v-model="actionCollapse" :style="{
              '--el-collapse-content-bg-color': 'var(--theme-bg)',
              '--el-collapse-header-bg-color': 'var(--theme-bg)'
            }"
          >
            <el-collapse-item
              v-for="item in menu"
              :key="item.title"
              :title="item.title"
              :name="item.title"
            >
              <draggable
                :list="item.children"
                item-key="type"
                :sort="false"
                :clone="cloneNewWidget"
                :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                class="flex justify-between flex-wrap"
              >
                <template #item="{ element }">
                  <div
                    class="cursor-pointer w-[48%] mb-3 flex justify-start items-center border border-$el-border-color py-1 px-2 rounded-md hover:border-$el-color-primary hover:text-$el-color-primary"
                  >
                    <component
                      :is="element.icon"
                      class="mr-2 text-$el-color-primary"
                    />
                    {{ element.title }}
                  </div>
                </template>
              </draggable>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane lazy>
        <template #label>
          <CodiconListTree />
        </template>
        <h3 class="text-base py-2 text-$el-color-primary">
          结构树
        </h3>
        <el-scrollbar>
          <el-tree
            :data="widgetList"
            default-expand-all
            class="node-tree bg-$theme-bg"
            :props="treeDefaultProps"
            @node-click="handleNodeClick"
          />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>

    <!-- <el-button :icon="PhInfo" circle class="absolute bottom-4 left-3" @click="openInfoDialog" type="info"></el-button> -->
    <PhInfo class="absolute bottom-4 left-4 text-xl cursor-pointer text-gray-400 hover:text-[var(--el-color-primary)]" @click="openInfoDialog"/>

    <el-dialog v-model="infoDialog" title="About" width="500px">
      <div class="text-center">
        <img src="/logo.png" class="w-[120px]" alt="">
        <h2>Corgi-ICode</h2>
        <ul>
          <li>🍄 此项目只是为练习而写的，如要使用，请认真检查所生成的代码。 🍄</li>
          <li>🌼 如果对你有用，那真是太好啦~ 🌼</li>
          <li>🍊 项目已开源，右上角即可看到（点个star呦）🍊</li>
          <li>🎈 欢迎加我微信，共同学习哦~ 🎈</li>
        </ul>

        <img src="/wx.png" class="w-[200px]" alt="">
        <p>（ 请备注来意哦 ）</p>
      </div>
    </el-dialog>
  </el-aside>
</template>

<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { cloneDeep } from 'lodash-es'
import type { ITemplateOptions, IWidgetItem } from '@corgi-icode/core'
import { activeWidgetKey, cloneNewWidget, defaultTemplateList, menu, uuId, widgetList } from '@corgi-icode/core'
import { getTemplateList } from '@/composables'
import GgComponents from '~icons/gg/components'
import GgTemplate from '~icons/gg/template'
import CodiconListTree from '~icons/codicon/list-tree'
import PhInfo from '~icons/ph/info'

const actionCollapse = ref()
const templateList = getTemplateList(defaultTemplateList)

watch(menu, () => {
  if (menu.value) {
    actionCollapse.value = menu.value.slice(0, 2).map(e => e.title)
  }
})

const renderTemplate = (item: ITemplateOptions) => {
  ElMessageBox.confirm(`是否使用${item.title}替换当前配置?`)
    .then(() => {
      widgetList.value = cloneDeep(item.widgetList)
      uuId.value = item.uuId
    })
    .catch(() => {})
}

const infoDialog = ref(true)

function openInfoDialog() {
  infoDialog.value = true
}

const treeDefaultProps = {
  label: (data: IWidgetItem) =>
    (data.form.label ? `${data.form.label.value} - ` : '') + data.type,
  children: 'children',
  class: (data: IWidgetItem) =>
    activeWidgetKey.value === data.key ? 'text-$el-color-primary' : '',
}
const handleNodeClick = (data: IWidgetItem) => {
  activeWidgetKey.value = data.key
}
</script>

<style>
.el-collapse-item__content {
  padding-bottom: 0;
}
.node-tree .el-tree-node {
  position: relative;
  padding-left: 12px;
}
.node-tree .el-tree-node__content {
  padding-left: 5px !important;
}
.node-tree .el-tree-node__expand-icon.is-leaf {
  display: none;
}
.node-tree .el-tree-node__expand-icon {
  margin-left: -3px;
  padding: 6px 6px 6px 0;
  font-size: 16px;
}
.node-tree .el-tree-node::before {
  content: '';
  border-left: 1px dashed #4386c6;
  bottom: 0px;
  height: 100%;
  top: -6px;
  width: 1px;
  left: 0px;
  position: absolute;
  right: auto;
}
.node-tree .el-tree-node::after {
  content: '';
  border-top: 1px dashed #4386c6;
  height: 20px;
  top: 12px;
  width: 16px;
  left: -4px;
  position: absolute;
  right: auto;
}
.aside-tabs .el-tabs__content,
.aside-tabs .el-tab-pane {
  height: 100%;
}
.aside-tabs .el-tab-pane .el-scrollbar {
  height: calc(100% - 40px);
}

ul {
  padding: 0;
}
li{
  list-style: none;
  margin: 20px 0;
}
</style>
