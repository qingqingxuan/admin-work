import { defineComponent, toRefs } from 'vue'
import TitleStyle from './css/title.module.less'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { title } = toRefs(props)
    return () => (
      <div class={TitleStyle['title-container']}>
        <span class={TitleStyle['line']}></span>
        <span class={TitleStyle['title']}>{title.value}</span>
      </div>
    )
  },
})
