package com.example.basicapi.user;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.basicapi.entities.UserEntity;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class UserRepositoryTest {

  @Autowired
  private UserRepository userRepository;

  @Test
  public void shouldBeAbleToInsertUser() {
    UserEntity user = new UserEntity();
    user.setAccountId("123");
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setAddress("123 Main St");

    assertDoesNotThrow(() -> {
      userRepository.save(user);
    });
  }

  @Test
  public void test_getUserIdsByAccountId() {
    UserEntity user = new UserEntity();
    user.setAccountId("A123");
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setAddress("123 Main St");

    UserEntity insertedUser = userRepository.save(user);

    List<Long> result = userRepository
        .getUserIdsByAccountId("A123");

    assertEquals(insertedUser.getId(), result.get(0));
    assertNotEquals(10, result.get(0));
    assertEquals(1, result.size());
  }

  @Test
  public void test_searchByName() {
    UserEntity user = new UserEntity();
    user.setAccountId("A123");
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setAddress("123 Main St");

    UserEntity insertedUser = userRepository.save(user);

    List<UserEntity> result = userRepository
        .searchByName("John");

    assertEquals(insertedUser.getId(), result.get(0).getId());
    assertNotEquals(10, result.get(0).getId());
    assertEquals(1, result.size());
    assertEquals("John", result.get(0).getFirstName());
    assertEquals("Doe", result.get(0).getLastName());
    assertEquals("123 Main St", result.get(0).getAddress());
  }

  @Test
  public void test_searchByName_in_multipleUsers_scenario() {
    UserEntity user = new UserEntity();
    user.setAccountId("A4829");
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setAddress("123 Main St");

    UserEntity insertedUser = userRepository.save(user);

    UserEntity user2 = new UserEntity();
    user2.setAccountId("A83947");
    user2.setFirstName("Sundar");
    user2.setLastName("Pichai");
    user2.setAddress("1600 Amphitheatre Parkway");

    UserEntity insertedUser2 = userRepository.save(user2);

    UserEntity user3 = new UserEntity();
    user3.setAccountId("A1674");
    user3.setFirstName("Mary");
    user3.setLastName("Jane");
    user3.setAddress("420 Blaze It");

    UserEntity insertedUser3 = userRepository.save(user3);

    List<UserEntity> result = userRepository
        .searchByName("ar");

    assertNotEquals(10, result.get(0).getId());
    assertEquals(2, result.size());
    assertTrue(result.stream().anyMatch(u -> u.getId().equals(insertedUser2.getId())));
    assertTrue(result.stream().anyMatch(u -> u.getId().equals(insertedUser3.getId())));

    assertTrue(
        result.stream()
            .anyMatch(u -> u.getFirstName().equals("Sundar")));
    assertTrue(
        result.stream()
            .anyMatch(u -> u.getFirstName().equals("Mary")));

  }

  @Test
  public void test_searchByAccountid_in_multipleUsers_scenario() {
    UserEntity user = new UserEntity();
    user.setAccountId("A4829");
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setAddress("123 Main St");

    UserEntity insertedUser = userRepository.save(user);

    UserEntity user2 = new UserEntity();
    user2.setAccountId("A83947");
    user2.setFirstName("Sundar");
    user2.setLastName("Pichai");
    user2.setAddress("1600 Amphitheatre Parkway");

    UserEntity insertedUser2 = userRepository.save(user2);

    UserEntity user3 = new UserEntity();
    user3.setAccountId("A1674");
    user3.setFirstName("Mary");
    user3.setLastName("Jane");
    user3.setAddress("420 Blaze It");

    UserEntity insertedUser3 = userRepository.save(user3);

    List<UserEntity> result = userRepository
        .searchByAccountId("67");

    assertNotEquals(10, result.get(0).getId());
    assertEquals(1, result.size());
    assertTrue(result.stream().anyMatch(u -> u.getId().equals(insertedUser3.getId())));

    assertTrue(
        result.stream()
            .anyMatch(u -> u.getFirstName().equals("Mary")));
  }
}
