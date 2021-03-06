import { ComponentPublicInstance, App } from "vue";

export const extend = Object.assign;
export const inBrowser = typeof window !== "undefined";
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}
// eslint-disable-next-line
export type ComponentInstance = ComponentPublicInstance<{}, any>;

export type Interceptor = (...args: any[]) => Promise<boolean> | boolean;

const camelizeRE = /-(\w)/g;

export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export function withInstall<T>(options: T) {
  (options as Record<string, unknown>).install = (app: App) => {
    const { name } = options as any;
    app.component(name, options);
    app.component(camelize(`-${name}`), options);
  };

  return options as WithInstall<T>;
}

export function deepClone<T extends Record<string, any> | null | undefined>(
  obj: T
): T {
  if (!isDef(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return (obj.map((item) => deepClone(item)) as unknown) as T;
  }

  if (typeof obj === "object") {
    const to = {} as Record<string, any>;
    Object.keys(obj).forEach((key) => {
      to[key] = deepClone(obj[key]);
    });

    return to as T;
  }

  return obj;
}
