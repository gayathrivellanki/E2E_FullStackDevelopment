package com.example.basicapi.entities;

import java.util.Map;
import lombok.Data;

@Data
public class BaseResponse<T> {
  private final T data;
  private final Map<String, String> error;

  public BaseResponse(T data, Map<String, String> error) {
    this.data = data;
    this.error = error;
  }
}
