package dev.brianwidom.MovieGame.repositories;

import dev.brianwidom.MovieGame.entities.CorrectMovie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface CorrectMovieRepository extends JpaRepository<CorrectMovie, String> {

}
