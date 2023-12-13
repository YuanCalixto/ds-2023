package br.com.dominiosdesoftware.todo.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TodoDto(@NotBlank String name, @NotBlank String description, @NotNull Boolean completed) {

}