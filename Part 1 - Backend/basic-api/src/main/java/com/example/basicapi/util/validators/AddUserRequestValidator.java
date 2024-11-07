package com.example.basicapi.util.validators;

import java.util.HashMap;
import java.util.Map;

import com.example.basicapi.entities.AddUserRequest;

public class AddUserRequestValidator {

  private static final String ACCOUNT_ID_REGEX = "A[0-9]{9}";

  public static Map<String, String> validate(AddUserRequest request) {
    Map<String, String> errors = new HashMap<>();

    if (request.getAccountId() == null || !request.getAccountId().matches(ACCOUNT_ID_REGEX)) {
      errors.put("accountId", "Invalid Account ID. Must be in the format A#########");
    }
    if (request.getFirstName() == null || request.getFirstName().isEmpty() || request.getFirstName().length() < 3
        || request.getFirstName().length() > 50) {
      errors.put("firstName", "First name is required and must be between 3 and 50 characters");
    }
    if (request.getLastName() == null || request.getLastName().isEmpty() || request.getLastName().length() < 3
        || request.getLastName().length() > 50) {
      errors.put("lastName", "Last name is required and must be between 3 and 50 characters");
    }
    if (request.getLine1() == null || request.getLine1().isEmpty() || request.getLine1().length() < 3
        || request.getLine1().length() > 100) {
      errors.put("line1", "Address line 1 is required and must be between 3 and 100 characters");
    }
    if (request.getCity() == null || request.getCity().isEmpty() || request.getCity().length() < 3
        || request.getCity().length() > 50) {
      errors.put("city", "City is required and must be between 3 and 50 characters");
    }
    if (request.getState() == null || request.getState().isEmpty() || request.getState().length() < 2
        || request.getState().length() > 2) {
      errors.put("state", "State is required and must be 2 characters");
    }
    if (request.getCountry() == null || request.getCountry().isEmpty() || request.getCountry().length() < 2
        || request.getCountry().length() > 50) {
      errors.put("country", "Country is required and must be between 2 and 50 characters");
    }
    if (request.getZip() == null || request.getZip().isEmpty() || request.getZip().length() < 5
        || request.getZip().length() > 6) {
      errors.put("zip", "Zip code is required and must be valid");
    }

    return errors;
  }
}
