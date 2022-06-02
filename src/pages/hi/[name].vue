<script setup lang="ts">
const props = defineProps<{ name: string }>()
const router = useRouter()
</script>

<template>
  <div>
    <p>
      Hi, {{ props.name }}
    </p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>

    <div>
      <el-button
        class="mt-4"
        type="success"
        @click="router.back()"
      >
        Back
      </el-button>
    </div>
  </div>
</template>
