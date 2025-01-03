import {
  Checkbox,
  Input,
  InputNumber,
  Option,
  Select,
  SelectOptionData,
  SelectProps,
} from '@arco-design/web-vue'
import { AllowedComponentProps, h, Ref } from 'vue'

export default function FormRender(props: any) {
  if (!props || !props.formItem) {
    throw new Error('miss formItem prop and check it')
  }
  return props.render(props.formItem, h)
}

export function renderInput(value: Ref<string>, props = {}) {
  return (
    <Input
      onUpdate:modelValue={(newValue) => {
        value.value = newValue
      }}
      modelValue={value.value}
      {...props}
    />
  )
}

export function renderInputNumber(value: Ref<number | undefined>, props = {}) {
  return (
    <InputNumber
      onUpdate:modelValue={(newVal) => {
        value.value = newVal
      }}
      modelValue={value.value}
      {...props}
    />
  )
}

export function renderCheckBox(
  value: Ref<boolean | (string | number | boolean)[]>,
  tip = '',
  props = {}
) {
  return (
    <Checkbox
      onUpdate:modelValue={(newVal) => {
        value.value = newVal
      }}
      modelValue={value.value}
      {...props}
    >
      {tip}
    </Checkbox>
  )
}

export function renderSelect(
  value: Ref<
    string | number | Record<string, unknown> | (string | number | Record<string, unknown>)[]
  >,
  options: SelectOptionData[],
  props: SelectProps & AllowedComponentProps = {}
) {
  return (
    <Select
      onUpdate:modelValue={(newVal) => {
        value.value = newVal
      }}
      modelValue={value.value}
      {...props}
    >
      {options.map((it) => {
        return <Option value={it.value} label={it.label} />
      })}
    </Select>
  )
}
