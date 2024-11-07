package com.example.basicapi.user;

import java.util.List;

import org.springframework.stereotype.Service;
import com.example.basicapi.entities.AddUserRequest;
import com.example.basicapi.entities.UserEntity;
import com.example.basicapi.util.exception.AppError;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserEntity createUser(AddUserRequest requestBody) throws Exception {
    // check if account id already exists
    List<Long> userIds = userRepository.getUserIdsByAccountId(requestBody.getAccountId());
    if (userIds != null && !userIds.isEmpty()) {
      throw new AppError("Account ID is taken");
    }

    UserEntity user = new UserEntity();
    user.setAccountId(requestBody.getAccountId());
    user.setFirstName(requestBody.getFirstName());
    user.setLastName(requestBody.getLastName());

    StringBuffer address = new StringBuffer();
    address.append(requestBody.getLine1());
    if (requestBody.getLine2() != null) {
      address.append(", ").append(requestBody.getLine2());
    }
    address.append(", ").append(requestBody.getCity());
    address.append(", ").append(requestBody.getState());
    address.append(", ").append(requestBody.getCountry());
    address.append(", ").append(requestBody.getZip());
    user.setAddress(address.toString());

    UserEntity newUser = userRepository.save(user);
    return newUser;
  }

  public List<UserEntity> getUsers() {
    return userRepository.findAll();
  }

  public List<UserEntity> searchByName(String query) {
    return userRepository.searchByName(query);
  }

  public List<UserEntity> searchByAccountId(String query) {
    return userRepository.searchByAccountId(query);
  }
}
