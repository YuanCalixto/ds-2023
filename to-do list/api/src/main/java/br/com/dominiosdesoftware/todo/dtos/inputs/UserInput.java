package br.com.dominiosdesoftware.todo.dtos.inputs;

import jakarta.validation.constraints.NotBlank;

public record UserInput(@NotBlank String login, @NotBlank String password) {

}