package com.example.basicapi.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.basicapi.entities.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  @Query("SELECT u.id FROM UserEntity u WHERE u.accountId = :accountId")
  List<Long> getUserIdsByAccountId(@Param("accountId") String accountId);

  @Query("SELECT u FROM UserEntity u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%'))")
  List<UserEntity> searchByName(@Param("query") String query);

  @Query("SELECT u FROM UserEntity u WHERE LOWER(u.accountId) LIKE LOWER(CONCAT('%', :query, '%'))")
  List<UserEntity> searchByAccountId(@Param("query") String query);
}
