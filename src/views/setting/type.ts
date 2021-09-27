type setDataType = "cell" | "title";
export interface setDataItem {
  type: setDataType;
  title: string;
  filedName?: string;
  isSwitch?: boolean;
  value?: string;
  arrow?: boolean;
}
