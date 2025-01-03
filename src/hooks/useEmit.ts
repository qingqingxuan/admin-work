import { TinyEmitter } from 'tiny-emitter'
import { inject } from 'vue'

export const emitKey = Symbol('tiny-emit')

export default function useEmit() {
  return inject<TinyEmitter>(emitKey)
}
