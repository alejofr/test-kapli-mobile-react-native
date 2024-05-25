import { ApiError, IApiError } from "../../config/kapliTestApi";

export const formatterErrsApi = <E  extends Object>(err: E) => {
    
    for (const key in err) {
        return err[key];
    }

}