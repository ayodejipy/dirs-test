<template>
  <div id="app" class="min-h-screen max-w-7xl mx-auto">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<style>
.truncate-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>