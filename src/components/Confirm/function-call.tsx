import { App, CSSProperties, TeleportProps } from "vue";
import {
  extend,
  inBrowser,
  withInstall,
  Interceptor,
  ComponentInstance,
} from "@/utils";
import { mountComponent, usePopupState } from "@/utils/mount-component";

import MConfirm, {
  ConfirmAction,
  ConfirmMessage,
  ConfirmMessageAlign,
} from "./Confirm";

export type ConfirmOptions = {
  title?: string;
  width?: string | number;
  message?: ConfirmMessage;
  overlay?: boolean;
  teleport?: TeleportProps["to"];
  className?: unknown;
  allowHtml?: boolean;
  lockScroll?: boolean;
  transition?: string;
  beforeClose?: Interceptor;
  messageAlign?: ConfirmMessageAlign;
  overlayClass?: string;
  overlayStyle?: CSSProperties;
  closeOnPopstate?: boolean;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelButtonColor?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  closeOnClickOverlay?: boolean;
};

let instance: ComponentInstance;

function initInstance() {
  const Wrapper = {
    setup() {
      const { state, toggle } = usePopupState();
      return () => (
        <MConfirm {...state} {...{ "onUpdate:modelValue": toggle }} />
      );
    },
  };

  ({ instance } = mountComponent(Wrapper));
}

function Confirm(options: ConfirmOptions) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }

    instance.open(
      extend({}, Confirm.currentOptions, options, {
        callback: (action: ConfirmAction) => {
          (action === "confirm" ? resolve : reject)(action);
        },
      })
    );
  });
}

Confirm.defaultOptions = {
  title: "",
  width: "",
  theme: null,
  message: "",
  overlay: true,
  callback: null,
  teleport: "body",
  className: "",
  allowHtml: false,
  lockScroll: true,
  beforeClose: null,
  overlayClass: "",
  overlayStyle: undefined,
  messageAlign: "",
  cancelButtonText: "",
  cancelButtonColor: null,
  confirmButtonText: "",
  confirmButtonColor: null,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false,
};

Confirm.currentOptions = extend({}, Confirm.defaultOptions);
Confirm.alert = Confirm;

Confirm.confirm = (options: ConfirmOptions) =>
  Confirm(extend({ showCancelButton: true }, options));

Confirm.close = () => {
  if (instance) {
    instance.toggle(false);
  }
};

Confirm.setDefaultOptions = (options: ConfirmOptions) => {
  extend(Confirm.currentOptions, options);
};

Confirm.resetDefaultOptions = () => {
  Confirm.currentOptions = extend({}, Confirm.defaultOptions);
};

Confirm.Component = withInstall(MConfirm);

Confirm.install = (app: App) => {
  app.use(Confirm.Component);
  app.config.globalProperties.$confirm = Confirm;
};

export { Confirm };
