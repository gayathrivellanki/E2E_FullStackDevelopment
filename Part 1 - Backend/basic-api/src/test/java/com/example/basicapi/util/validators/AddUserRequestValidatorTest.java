package com.example.basicapi.util.validators;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.Map;
import org.junit.jupiter.api.Test;
import com.example.basicapi.entities.AddUserRequest;

public class AddUserRequestValidatorTest {
  @Test
  public void testValidate_with_allValidFields() {
    AddUserRequest request = new AddUserRequest(
        "A123456789",
        "John",
        "Doe",
        "123 Main St",
        "",
        "Springfield",
        "IL",
        "USA",
        "62701");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(0, errors.size());
  }

  @Test
  public void testValidate_with_invalidAccountId() {
    AddUserRequest request = new AddUserRequest(
        "123456789",
        "John",
        "Doe",
        "123 Main St",
        "",
        "Springfield",
        "IL",
        "USA",
        "62701");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(1, errors.size());
    assertEquals("Invalid Account ID. Must be in the format A#########", errors.get("accountId"));
  }

  @Test
  public void testValidate_with_invalidFirstName() {
    AddUserRequest request = new AddUserRequest(
        "A123456789",
        "",
        "Doe",
        "123 Main St",
        "",
        "Springfield",
        "IL",
        "USA",
        "62701");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(1, errors.size());
    assertEquals("First name is required and must be between 3 and 50 characters", errors.get("firstName"));
  }

  @Test
  public void testValidate_with_invalidLastName() {
    AddUserRequest request = new AddUserRequest(
        "A123456789",
        "John",
        "",
        "123 Main St",
        "",
        "Springfield",
        "IL",
        "USA",
        "62701");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(1, errors.size());
    assertEquals("Last name is required and must be between 3 and 50 characters", errors.get("lastName"));
  }

  @Test
  public void testValidate_with_invalidLine1() {
    AddUserRequest request = new AddUserRequest(
        "A123456789",
        "John",
        "Doe",
        "",
        "",
        "Springfield",
        "IL",
        "USA",
        "62701");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(1, errors.size());
    assertEquals("Address line 1 is required and must be between 3 and 100 characters", errors.get("line1"));
  }

  @Test
  public void testValidate_with_invalidCity() {
    AddUserRequest request = new AddUserRequest(
        "A123456789",
        "John",
        "Doe",
        "123 Main St",
        "",
        "",
        "IL",
        "USA",
        "62701");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(1, errors.size());
    assertEquals("City is required and must be between 3 and 50 characters", errors.get("city"));
  }

  @Test
  public void testValidate_with_invalidState() {
    AddUserRequest request = new AddUserRequest(
        "A123456789",
        "John",
        "Doe",
        "123 Main St",
        "",
        "Springfield",
        "",
        "USA",
        "62701");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(1, errors.size());
    assertEquals("State is required and must be 2 characters", errors.get("state"));
  }

  @Test
  public void testValidate_with_invalidCountry() {
    AddUserRequest request = new AddUserRequest(
        "A123456789",
        "John",
        "Doe",
        "123 Main St",
        "",
        "Springfield",
        "IL",
        "",
        "62701");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(1, errors.size());
    assertEquals("Country is required and must be between 2 and 50 characters", errors.get("country"));
  }

  @Test
  public void testValidate_with_invalidZip() {
    AddUserRequest request = new AddUserRequest(
        "A123456789",
        "John",
        "Doe",
        "123 Main St",
        "",
        "Springfield",
        "IL",
        "USA",
        "");
    Map<String, String> errors = AddUserRequestValidator.validate(request);
    assertEquals(1, errors.size());
    assertEquals("Zip code is required and must be valid", errors.get("zip"));
  }
}
