export interface ExampleResponse {
  result: number,
  error: {
    [key: string | number]: string
  },
}
