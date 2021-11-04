<template>
  <div>
    <n-card v-for="item of dataList" :key="item.id" content-style="{ padding: '10px' }">
      <n-grid class="item-wrapper" :x-gap="10" :y-gap="10" :cols="2">
        <n-grid-item>
          <div class="header-wrapper">
            <div class="avatar-wrapper">
              <img class="avatar" :src="item.avatar" />
              <img class="vip" src="/src/assets/img_vip_icon.png" />
            </div>
            <div class="nick-wrapper">
              <span class="nick-name">{{ item.nickName }}</span>
              <n-rate :default-value="item.rate" readonly size="small" />
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </n-grid-item>
        <n-grid-item>
          <div class="content-wrapper">
            <div>时间</div>
            <div>{{ item.time }}</div>
          </div>
        </n-grid-item>
        <n-grid-item>
          <div style="height: 100%; width: 100%" class="flex justify-center flex-direction">
            <n-progress
              type="line"
              :percentage="item.progress"
              :indicator-placement="'inside'"
              processing
            />
          </div>
        </n-grid-item>
      </n-grid>
    </n-card>
    <TableFooter :pagination="pagination" />
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getCommentList } from '@/api/url'
  import { usePagination, useTable } from '@/hooks/table'
  import { defineComponent, onMounted } from 'vue'

  export default defineComponent({
    name: 'List',
    setup() {
      const table = useTable()
      const pagination = usePagination(doRefresh)
      function doRefresh() {
        post({
          url: getCommentList,
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
  .item-wrapper {
    padding: 10px;
    .header-wrapper {
      display: flex;
      justify-content: flex-start;
      .avatar-wrapper {
        position: relative;
        .avatar {
          border-radius: 5px;
          width: 70px;
          height: 70px;
          border: 1px solid #f5f5f5;
        }
        .vip {
          position: absolute;
          top: -13px;
          right: -13px;
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
        }
      }
      .nick-wrapper {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
      }
    }
    .content-wrapper {
      text-align: center;
      height: 100%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    &::after {
      content: '';
      display: block;
      height: 1px;
      width: 100%;
      margin-top: 10px;
      background-color: #f5f5f5;
    }
  }
</style>
