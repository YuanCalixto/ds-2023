package br.com.dominiosdesoftware.todo.dtos.inputs;

import br.com.dominiosdesoftware.todo.models.user.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record TagInput(@NotBlank String name, @NotNull Integer taskId) {

}