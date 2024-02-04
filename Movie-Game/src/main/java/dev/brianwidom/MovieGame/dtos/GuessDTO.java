package dev.brianwidom.MovieGame.dtos;

import dev.brianwidom.MovieGame.util.MovieSimilarities;
import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class GuessDTO {
    private boolean correct;
    private String guessTitle;
    private MovieSimilarities similarities;
}
