import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDTO {
  @ApiProperty()
  status: number;

  setStatus(status: number) {
    this.status = status;
    return this;
  }
}

export class SuccessApiResponseDTO<T> extends ApiResponseDTO {
  @ApiProperty()
  data: T;

  setData(data: T) {
    this.data = data;
    return this;
  }
}

export class ErrorApiResponseDTO extends ApiResponseDTO {
  @ApiProperty()
  message: string;
  @ApiProperty()
  error?: object;

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setError(error: object) {
    this.error = error;
    return this;
  }
}
