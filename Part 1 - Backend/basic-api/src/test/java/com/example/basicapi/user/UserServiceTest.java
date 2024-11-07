package com.example.basicapi.user;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.basicapi.entities.AddUserRequest;
import com.example.basicapi.entities.UserEntity;
import com.example.basicapi.util.exception.AppError;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class UserServiceTest {
  @Autowired
  private UserService userService;

  @Test
  public void test_createUser() {
    AddUserRequest requestBody = new AddUserRequest(
        "A123",
        "John",
        "Doe",
        "123 Main St",
        null,
        "San Francisco",
        "CA",
        "USA",
        "94105");

    final UserEntity[] result = new UserEntity[1];
    assertDoesNotThrow(() -> {
      result[0] = userService.createUser(requestBody);
    });
    assertNotNull(result[0]);
    assertEquals("A123", result[0].getAccountId());
    assertEquals("John", result[0].getFirstName());
    assertEquals("Doe", result[0].getLastName());
  }

  @Test
  public void test_duplicateAccountId_scenario() {
    AddUserRequest requestBody = new AddUserRequest(
        "A123",
        "John",
        "Doe",
        "123 Main St",
        null,
        "San Francisco",
        "CA",
        "USA",
        "94105");

    final UserEntity[] result = new UserEntity[1];
    assertDoesNotThrow(() -> {
      result[0] = userService.createUser(requestBody);
    });

    AddUserRequest requestBody2 = new AddUserRequest(
        "A123",
        "Jane",
        "Doe",
        "123 Main St",
        null,
        "San Francisco",
        "CA",
        "USA",
        "94105");

    assertThrows(AppError.class, () -> {
      userService.createUser(requestBody2);
    });
  }

  @Test
  public void test_getUsers() {
    AddUserRequest requestBody = new AddUserRequest(
        "A123",
        "John",
        "Doe",
        "123 Main St",
        null,
        "San Francisco",
        "CA",
        "USA",
        "94105");

    final UserEntity[] result = new UserEntity[1];
    assertDoesNotThrow(() -> {
      result[0] = userService.createUser(requestBody);
    });

    assertEquals(1, userService.getUsers().size());
  }

  @Test
  public void test_searchByName() {
    AddUserRequest requestBody = new AddUserRequest(
        "A123",
        "John",
        "Doe",
        "123 Main St",
        null,
        "San Francisco",
        "CA",
        "USA",
        "94105");

    final UserEntity[] result = new UserEntity[1];
    assertDoesNotThrow(() -> {
      result[0] = userService.createUser(requestBody);
    });

    assertEquals(1, userService.searchByName("John").size());
  }

  @Test
  public void test_searchByAccountId() {
    AddUserRequest requestBody = new AddUserRequest(
        "A123",
        "John",
        "Doe",
        "123 Main St",
        null,
        "San Francisco",
        "CA",
        "USA",
        "94105");

    final UserEntity[] result = new UserEntity[1];
    assertDoesNotThrow(() -> {
      result[0] = userService.createUser(requestBody);
    });

    assertEquals(1, userService.searchByAccountId("A123").size());
  }
}
