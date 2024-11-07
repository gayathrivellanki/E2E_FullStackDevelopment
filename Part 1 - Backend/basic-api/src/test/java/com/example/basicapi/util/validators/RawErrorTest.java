package com.example.basicapi.util.validators;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.Map;
import org.junit.jupiter.api.Test;
import com.example.basicapi.util.wrapper.RawError;

public class RawErrorTest {
  @Test
  public void testWrapMethod() {
    String message = "test";
    Map<String, String> error = RawError.wrap(message);
    assertEquals(1, error.size());
  }

  @Test
  public void testWrapMethod2() {
    String message = "Long error message here";
    Map<String, String> error = RawError.wrap(message);
    assertEquals(message, error.get("raw"));
  }
}
