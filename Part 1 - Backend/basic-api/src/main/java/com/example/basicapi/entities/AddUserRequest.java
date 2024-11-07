package com.example.basicapi.entities;

import lombok.Data;

@Data
public class AddUserRequest {
  private final String accountId;
  private final String firstName;
  private final String lastName;

  // address lines
  private final String line1;
  private final String line2;
  private final String city;
  private final String state;
  private final String country;
  private final String zip;
}
