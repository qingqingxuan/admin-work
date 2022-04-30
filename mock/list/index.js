import Mock, { Random } from 'mockjs'
import { baseData } from '../base.ts'
import {
  getDepartmentList,
  getTableList,
  getCardList,
  getCommentList,
  addDepartment,
  getRoleList,
} from '@/api/url'

const isDev = import.meta.env.MODE === 'development'

const totalSize = 30

function computePageSize(totalSize, page, pageSize) {
  return Math.abs(totalSize - pageSize * page >= 0 ? pageSize : totalSize - pageSize * page)
}

Mock.mock(RegExp(getDepartmentList), 'post', function () {
  return Mock.mock({
    ...baseData,
    totalSize,
    data: [
      {
        id: 1,
        name: '总裁办',
        parentId: '',
        depCode: 'dp_code_manager',
        'order|+1': 1,
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
        status: 0, // 0 禁用 1正常
      },
      {
        id: 2,
        name: '市场部',
        parentId: '',
        depCode: 'dp_code_marketing',
        'order|+1': 1,
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
        status: 1, // 0 禁用 1正常,
        children: [
          {
            id: 3,
            name: '市场一部',
            parentId: 2,
            depCode: 'dp_code_marketing_1',
            'order|+1': 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            status: 1, // 0 禁用 1正常
          },
          {
            id: 4,
            name: '市场二部',
            parentId: 2,
            depCode: 'dp_code_marketing_2',
            'order|+1': 1,
            createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
            status: 1, // 0 禁用 1正常
          },
        ],
      },
      {
        id: 5,
        name: '技术部',
        parentId: '',
        depCode: 'dp_code_technology',
        'order|+1': 1,
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
        status: 1, // 0 禁用 1正常
      },
      {
        id: 6,
        name: '销售部',
        parentId: '',
        depCode: 'dp_code_sale',
        'order|+1': 1,
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
        status: 1, // 0 禁用 1正常
      },
    ],
  })
})

Mock.mock(RegExp(getRoleList), 'post', function () {
  return Mock.mock({
    ...baseData,
    data: [
      {
        id: 1,
        name: '超级管理员',
        roleCode: 'ROLE_admin',
        description: '超级管理员',
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
      },
      {
        id: 2,
        name: '编辑员',
        roleCode: 'ROLE_editor',
        description: '编辑员',
        createTime: Random.now('yyyy-MM-dd HH:mm:ss'),
      },
    ],
  })
})

Mock.mock(RegExp(addDepartment), 'post', function () {
  return Mock.mock({ ...baseData, data: '' })
})

Mock.mock(RegExp(getTableList), 'post', function ({ body }) {
  const { page, pageSize = 10 } = JSON.parse(body)
  const size = computePageSize(totalSize, page, pageSize)
  return Mock.mock({
    ...baseData,
    totalSize,
    [`data|${size}`]: [
      {
        'id|+1': 1,
        nickName: function () {
          return Random.name()
        },
        avatar: (isDev ? '' : '/admin-work') + '/static/images/img_avatar_01.jpeg',
        'gender|0-1': 0, // 0男 1女
        'vip|0-1': 0, // 0不是 1是
        address: function () {
          return Random.city(true)
        },
        lastLoginTime: Random.now('yyyy-MM-dd HH:mm:ss'),
        lastLoginIp: function () {
          return Random.ip()
        },
        'status|0-1': 1, // 0 禁用 1正常
      },
    ],
  })
})

Mock.mock(RegExp(getCardList), 'post', function ({ body }) {
  const { page, pageSize = 10 } = JSON.parse(body)
  const size = computePageSize(totalSize, page, pageSize)
  return Mock.mock({
    ...baseData,
    totalSize,
    [`data|${size}`]: [
      {
        id: function () {
          return Random.string(10)
        },
        title: function () {
          return Random.csentence(5, 10)
        },
        'image|1-9': 1,
        description: function () {
          return Random.csentence(10, 15)
        },
        time: function () {
          return Random.date()
        },
      },
    ],
  })
})

Mock.mock(RegExp(getCommentList), 'post', function ({ body }) {
  const { page, pageSize = 10 } = JSON.parse(body)
  const size = computePageSize(totalSize, page, pageSize)
  return Mock.mock({
    ...baseData,
    totalSize,
    [`data|${size}`]: [
      {
        id: function () {
          return Random.string(10)
        },
        avatar: Random.image('100x100', '#50B347', '#FFF', 'vue-admin-work'),
        nickName: function () {
          return Random.cname()
        },
        content: function () {
          return Random.csentence(10, 20)
        },
        time: function () {
          return Random.date('yyyy-MM-dd')
        },
        'rate|1-5': 5,
        'progress|20-100': 50,
        'status|0-1': 1, // 对外展示状态 0 不展示，1 展示
      },
    ],
  })
})
