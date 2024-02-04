package dev.brianwidom.MovieGame.util;

import dev.brianwidom.MovieGame.models.CastMember;
import dev.brianwidom.MovieGame.models.Genre;
import dev.brianwidom.MovieGame.models.KeyWord;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MovieSimilarities {
    private int yearDifference;
    private KeyWord[] commonKeyWords;
    private CastMember[] commonCastMembers;
    private Genre[] commonGenres;
}
