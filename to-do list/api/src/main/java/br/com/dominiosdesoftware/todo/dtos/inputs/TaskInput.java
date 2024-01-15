package br.com.dominiosdesoftware.todo.dtos.inputs;

import br.com.dominiosdesoftware.todo.models.user.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record TaskInput(@NotBlank String name, @NotBlank String description, @NotNull Boolean completed, User user,
                        @NotBlank UUID listId) {

}