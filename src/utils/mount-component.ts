import {Component,createApp,reactive,nextTick,getCurrentInstance} from 'vue';
import {extend} from '@/utils';
export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, apis);
  }
}

export function usePopupState() {
  const state = reactive<{
    modelValue: boolean;
    [key: string]: any;
  }>({
    modelValue: false,
  });

  const toggle = (modelValue: boolean) => {
    state.modelValue = modelValue;
  };

  const open = (props: Record<string, any>) => {
    extend(state, props);
    nextTick(() => toggle(true));
  };

  const close = () => toggle(false);

  useExpose({ open, close, toggle });

  return {
    open,
    close,
    state,
    toggle,
  };
}

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent);
  const root = document.createElement('div');

  document.body.appendChild(root);

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    },
  };
}
