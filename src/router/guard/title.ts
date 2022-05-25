import router from '@/router'
import { projectName } from '@/setting'

function usePageTitleGuard() {
  router.afterEach((to) => {
    if (to.meta && to.meta.title) {
      const title = to.meta.title
      document.title = projectName + ' | ' + title
    } else {
      document.title = projectName
    }
  })
}

export default usePageTitleGuard
