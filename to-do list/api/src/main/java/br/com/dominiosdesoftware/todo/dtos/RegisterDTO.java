package br.com.dominiosdesoftware.todo.dtos;

import br.com.dominiosdesoftware.todo.models.user.UserRole;

public record RegisterDTO(String login, String password, UserRole role) {
}
