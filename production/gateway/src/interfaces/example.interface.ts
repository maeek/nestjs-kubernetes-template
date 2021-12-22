export interface ExampleResponse {
  result: number,
  errors?: {
    [key: string | number]: string
  },
}
