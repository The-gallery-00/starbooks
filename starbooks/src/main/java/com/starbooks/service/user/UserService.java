// com.starbooks.service.user.UserService.java
package com.starbooks.service.user;

import com.starbooks.domain.user.User;

import java.util.List;

public interface UserService {
    User create(User user);
    User findById(Long id);
    List<User> findAll();
    User update(Long id, User user);
    void delete(Long id);
}

