import { HttpStatus } from "@nestjs/common";

export namespace ExampleService {
  export interface ServiceResponse {
    status: HttpStatus;
    message: string;
    errors?: { [key: string | number ]: string };
    result: number; 
  }
}