<template>
  <div>
    <n-grid :x-gap="10" :y-gap="10" cols="2 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen">
      <n-grid-item v-for="item of dataList" :key="item.id" class="col-item">
        <n-card :content-style="{ padding: '0px' }" hoverable>
          <div class="text-center">
            <n-image
              style="width: 100%; height: 250px"
              :src="'/vue-admin-work-p/static/images/' + item.image + '.jpeg'"
              fit="cover"
            />
          </div>
          <div style="padding: 10px">
            <div class="goods-title">
              {{ item.title }}
            </div>
            <n-ellipsis :line-clamp="1" class="mt-1">
              {{ item.description }}
            </n-ellipsis>
            <div class="flex justify-between align-center margin-top-xs">
              <span class="text-df text-gray">
                {{ item.time }}
              </span>
            </div>
          </div>
        </n-card>
      </n-grid-item>
    </n-grid>
    <TableFooter :pagination="pagination" />
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getCardList } from '@/api/url'
  import { usePagination, useTable } from '@/hooks/table'
  import { defineComponent, onMounted } from 'vue'
  export default defineComponent({
    name: 'CardList',
    setup() {
      const pagination = usePagination(doRefresh)
      const table = useTable()
      function doRefresh() {
        post({
          url: getCardList,
          data: () => {
            return {
              page: pagination.page,
              pageSize: pagination.pageSize,
            }
          },
        })
          .then((res) => {
            table.handleSuccess(res)
            pagination.setTotalSize(res.totalSize || 10)
          })
          .catch(console.log)
      }
      onMounted(doRefresh)
      return {
        ...table,
        pagination,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .goods-title {
    font-size: 16px;
  }
</style>
