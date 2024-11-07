package com.example.basicapi.util.wrapper;

import java.util.Map;

public class RawError {
  public static Map<String, String> wrap(String message) {
    return Map.of("raw", message);
  }
}
