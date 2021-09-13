import { App, getCurrentInstance, ref, watch } from "vue";
import {
  extend,
  inBrowser,
  withInstall,
  Interceptor,
  ComponentInstance,
  isObject,
} from "@/utils";
import { mountComponent, usePopupState } from "@/utils/mount-component";

import MToast, { ToastType, ToastPosition } from "./Toast";

export type ToastOptions = {
  icon?: string;
  type?: ToastType;
  iconSize?: number | string;
  message?: number | string;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
  onOpened?: () => void;
};

const defaultOptions: ToastOptions = {
  icon: "",
  type: "text",
  message: "",
  onClose: undefined,
  onOpened: undefined,
  duration: 2000,
  iconSize: undefined,
  position: "center",
};

const queue: ComponentInstance[] = [];
let currentOptions = extend({}, defaultOptions);

const defaultOptionsMap = new Map<string, ToastOptions>();

function parseOptions(message: string | ToastOptions): ToastOptions {
  if (isObject(message)) {
    return message;
  }
  return { message };
}

function createInstance() {
  const { instance, unmount } = mountComponent({
    setup() {
      const message = ref("");
      const { open, state, close, toggle } = usePopupState();

      const onClosed = () => {
        unmount();
      };

      const render = () => {
        const attrs: Record<string, unknown> = {
          "onUpdate:modelValue": toggle,
        };
        return <MToast {...state} {...attrs} />;
      };

      // support dynamic modification of message
      watch(message, (val: any) => {
        state.message = val;
      });

      // rewrite render function
      (getCurrentInstance() as any).render = render;

      return {
        open,
        clear: close,
        message,
      };
    },
  });

  return instance;
}

function getInstance() {
  if (!queue.length) {
    const instance = createInstance();
    queue.push(instance);
  }
  return queue[queue.length - 1];
}

function Toast(options: string | ToastOptions) {
  if (!inBrowser) {
    return {} as ComponentInstance;
  }

  const toast = getInstance();
  const parsedOptions = parseOptions(options);

  toast.open(
    extend(
      {},
      currentOptions,
      defaultOptionsMap.get(parsedOptions.type || currentOptions.type!),
      parsedOptions
    )
  );

  return toast;
}

const createMethod = (type: ToastType) => (options: string | ToastOptions) =>
  Toast(extend({ type }, parseOptions(options)));

Toast.loading = createMethod("loading");
Toast.success = createMethod("success");
Toast.fail = createMethod("fail");

Toast.clear = (all?: boolean) => {
  if (queue.length) {
    queue[0].clear();
  }
};

Toast.setDefaultOptions = (type: ToastType | ToastOptions, options?: any) => {
  if (typeof type === "string") {
    defaultOptionsMap.set(type, options);
  } else {
    extend(currentOptions, type);
  }
};

Toast.resetDefaultOptions = (type?: ToastType) => {
  if (typeof type === "string") {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions = extend({}, defaultOptions);
    defaultOptionsMap.clear();
  }
};

Toast.Component = withInstall(MToast);

Toast.install = (app: App) => {
  app.use(withInstall(MToast));
  app.config.globalProperties.$toast = Toast;
};

export { Toast };
