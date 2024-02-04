package dev.brianwidom.MovieGame.controllers;

import dev.brianwidom.MovieGame.dtos.GuessDTO;
import dev.brianwidom.MovieGame.dtos.MovieDTO;
import dev.brianwidom.MovieGame.models.KeyWord;
import dev.brianwidom.MovieGame.repositories.CorrectMovieRepository;
import dev.brianwidom.MovieGame.repositories.MovieInfoRepository;
import dev.brianwidom.MovieGame.services.MovieService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/movie-game")
@CrossOrigin("https://reeldle.cfapps.us10-001.hana.ondemand.com")
public class MovieController {
    private MovieService movieService;
    public MovieController(MovieService movieService, MovieInfoRepository remo) {
        this.movieService = movieService;
    }

    @GetMapping("/movie-titles")
    public List<MovieDTO> getAllMovieTitles(@RequestParam String like){
        return movieService.findByTitleLike(like).stream().map(movie -> {
            return new MovieDTO(movie.getMovieId(), movie.getTitle());
        }).toList();
    }

    @GetMapping("/guess/{id}")
    public GuessDTO checkMovie(@PathVariable int id, @RequestHeader String _date){
        return movieService.checkIfMovieIsCorrect(id, _date);
    }

    @PostMapping("/keyWordHint")
    public KeyWord getKeyWordHint(@RequestBody List<KeyWord> knownKeyWords, @RequestHeader String _date){
        return movieService.getKeyWordHint(knownKeyWords, _date);
    }

    @GetMapping("/taglineHint")
    public String getTaglineHint(@RequestHeader String _date){
        return movieService.getTaglineHint(_date);
    }

    @GetMapping("/correctTitle")
    public String getCorrectTitle(@RequestHeader String _date){
        return movieService.getCorrectTitle(_date);
    }

    @PostMapping("/random-movie")
    public GuessDTO getRandomMovie(@RequestBody List<GuessDTO> guessedMovies, @RequestHeader String _date){
        return movieService.getRandomMovie(guessedMovies, _date);
    }
}
