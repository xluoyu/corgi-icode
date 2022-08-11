<!--
 * @Description: 
 * @Author: xluoyu
 * @LastEditTime: 2022-08-11 10:40:26
-->

## 第二次重构目标

1. 将项目修改成monorepo，大致拆分出(UI、components、core)
2. UI层与组件层解绑，实现可兼容不同组件库的需求
3. 将类似el-form-item组件写入组件内，不做额外处理，来兼容不同组件库