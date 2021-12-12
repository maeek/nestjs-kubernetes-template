import { HttpStatus } from "@nestjs/common";

export interface ExampleResponse {
  status: HttpStatus;
  message: string;
  result?: number;
  errors?: { [key: string]: any };
}