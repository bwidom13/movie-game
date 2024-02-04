package dev.brianwidom.MovieGame.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@Builder
@ToString
public class KeyWord {
    private int id;
    private String name;
}
