import { AxiosRequestConfig, AxiosResponse } from "axios";

interface SheetReturnItem extends AxiosResponse {
  privileges?: any;
  playlist?: any;
}

export { SheetReturnItem };
