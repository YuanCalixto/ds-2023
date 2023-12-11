package br.com.dominiosdesoftware.todo.dtos;

import jakarta.validation.constraints.NotBlank;

public record TodoDto(@NotBlank String name, @NotBlank String description) {
}