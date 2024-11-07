package com.example.basicapi.user;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.basicapi.entities.AddUserRequest;
import com.example.basicapi.entities.BaseResponse;
import com.example.basicapi.entities.UserEntity;
import com.example.basicapi.util.exception.AppError;
import com.example.basicapi.util.validators.AddUserRequestValidator;
import com.example.basicapi.util.wrapper.RawError;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/")
  public ResponseEntity<BaseResponse<UserEntity>> createUser(@RequestBody AddUserRequest requestBody) {
    Map<String, String> formErrors = AddUserRequestValidator.validate(requestBody);
    if (formErrors != null && !formErrors.isEmpty()) {
      return ResponseEntity.badRequest().body(new BaseResponse<>(null,
          formErrors));
    }

    try {
      UserEntity result = userService.createUser(requestBody);

      if (result == null || result.getId() == null || result.getId() <= 0) {
        return ResponseEntity.status(417)
            .body(new BaseResponse<>(null, RawError.wrap("Failed to create user")));
      }
      return ResponseEntity.ok(new BaseResponse<>(result, null));
    } catch (AppError e) {
      return ResponseEntity.badRequest()
          .body(new BaseResponse<>(null, RawError.wrap(e.getMessage())));
    } catch (Exception e) {
      return ResponseEntity.internalServerError()
          .body(new BaseResponse<>(null, RawError.wrap(e.getMessage())));
    }
  }

  @GetMapping("/")
  public ResponseEntity<BaseResponse<List<UserEntity>>> getUsers() {
    try {
      List<UserEntity> result = userService.getUsers();
      return ResponseEntity.ok(new BaseResponse<List<UserEntity>>(result,
          null));
    } catch (Exception e) {
      return ResponseEntity.internalServerError()
          .body(new BaseResponse<>(null, RawError.wrap(e.getMessage())));
    }
  }

  @GetMapping("/search")
  public ResponseEntity<BaseResponse<List<UserEntity>>> searchUsers(
      @RequestParam String query,
      @RequestParam String searchBy) {
    try {
      if (query == null || query.isEmpty() || query.length() < 2) {
        return ResponseEntity.badRequest()
            .body(
                new BaseResponse<>(
                    null,
                    RawError.wrap("Query is required and must be at least 2 characters")));
      }

      if (searchBy.equals("accountId")) {
        List<UserEntity> result = userService.searchByAccountId(query);
        return ResponseEntity.ok(new BaseResponse<List<UserEntity>>(result,
            null));
      }

      List<UserEntity> result = userService.searchByName(query);
      return ResponseEntity.ok(new BaseResponse<List<UserEntity>>(result,
          null));
    } catch (Exception e) {
      return ResponseEntity.internalServerError()
          .body(new BaseResponse<>(null, RawError.wrap(e.getMessage())));
    }
  }
}
