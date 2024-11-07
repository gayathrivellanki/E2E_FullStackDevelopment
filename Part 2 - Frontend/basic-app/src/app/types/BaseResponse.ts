export default interface BaseResponse<T> {
  data: T | null;
  error: Map<string, string> | null;
}
