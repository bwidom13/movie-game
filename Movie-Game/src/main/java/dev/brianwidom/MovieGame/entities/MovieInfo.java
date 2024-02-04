package dev.brianwidom.MovieGame.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MovieInfo {
    @Id
    private int movieId;
    private String title;
    private String castMembers;
    private String genres;
    private String keyWords;
    private String tagline;
    private LocalDateTime releaseDate;
}
