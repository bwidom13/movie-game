package dev.brianwidom.MovieGame.dtos;

import dev.brianwidom.MovieGame.models.KeyWord;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class KnownKeyWordsDTO {
    private KeyWord[] knownKeyWordsList;
}
