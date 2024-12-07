import { inject, ref, Ref } from "vue";

export default function useAppUI() {
  return inject<Ref<string>>("componentUIName", ref((window as any).__APP_UI_COMPONENT__))
}
