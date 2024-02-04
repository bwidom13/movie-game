package dev.brianwidom.MovieGame.services;

import com.google.gson.Gson;
import dev.brianwidom.MovieGame.dtos.GuessDTO;
import dev.brianwidom.MovieGame.entities.MovieInfo;
import dev.brianwidom.MovieGame.models.CastMember;
import dev.brianwidom.MovieGame.models.Genre;
import dev.brianwidom.MovieGame.models.KeyWord;
import dev.brianwidom.MovieGame.repositories.CorrectMovieRepository;
import dev.brianwidom.MovieGame.repositories.MovieInfoRepository;
import dev.brianwidom.MovieGame.util.MovieSimilarities;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class MovieService {
    private MovieInfoRepository movieInfoRepository;
    private CorrectMovieRepository correctMovieRepo;

    public MovieService(MovieInfoRepository movieInfoRepository, CorrectMovieRepository correctMovieRepo) {
        this.movieInfoRepository = movieInfoRepository;
        this.correctMovieRepo = correctMovieRepo;
    }

    private int getTodaysMovie(String date){
        return correctMovieRepo.findById(date).get().getMovieId();
    }

    public List<MovieInfo> findAll() {
        return movieInfoRepository.findAll(Sort.by("title"));
    }

    public List<MovieInfo> findByTitleLike(String title) { return movieInfoRepository.findByTitleLikeOrderByTitle("%"+title+"%");}

    public GuessDTO checkIfMovieIsCorrect(int guessId, String date) {
        Gson gson = new Gson();
        MovieInfo guessMovie = movieInfoRepository.findById(guessId).get();

        int correctID = getTodaysMovie(date);
        MovieInfo correctMovie = movieInfoRepository.findById(correctID).get();

        int yearDifference = correctMovie.getReleaseDate().getYear() - guessMovie.getReleaseDate().getYear();

        KeyWord[] correctKeyWords = gson.fromJson(correctMovie.getKeyWords(), KeyWord[].class);
        KeyWord[] guessKeyWords = gson.fromJson(guessMovie.getKeyWords(), KeyWord[].class);
        List<KeyWord> guessKeyWordsList = List.of(guessKeyWords);
        KeyWord[] sameKeyWords = Arrays.stream(correctKeyWords).filter((kw) -> {
            return guessKeyWordsList.contains(kw);
        }).toArray(KeyWord[]::new);

        CastMember[] correctCastMembers = gson.fromJson(correctMovie.getCastMembers(), CastMember[].class);
        CastMember[] guessCastMembers = gson.fromJson(guessMovie.getCastMembers(), CastMember[].class);
        List<CastMember> guessCastMembersList = List.of(guessCastMembers);
        CastMember[] sameCastMembers = Arrays.stream(correctCastMembers).filter((cm) -> {
            return guessCastMembersList.contains(cm);
        }).limit(3).toArray(CastMember[]::new);

        Genre[] correctGenres = gson.fromJson(correctMovie.getGenres(), Genre[].class);
        Genre[] guessGenres = gson.fromJson(guessMovie.getGenres(), Genre[].class);
        List<Genre> guessGenresList = List.of(guessGenres);
        Genre[] sameGenres = Arrays.stream(correctGenres).filter((g) -> {
            return guessGenresList.contains(g);
        }).toArray(Genre[]::new);

        MovieSimilarities movieSimilarities = MovieSimilarities.builder()
                .yearDifference(yearDifference)
                .commonKeyWords(sameKeyWords)
                .commonCastMembers(sameCastMembers)
                .commonGenres(sameGenres)
                .build();
        if(correctID == guessId){
            return new GuessDTO(true,guessMovie.getTitle(),movieSimilarities);
        }
        return new GuessDTO(false, guessMovie.getTitle(), movieSimilarities);
    }

    public KeyWord getKeyWordHint(List<KeyWord> knownKeyWords, String date) {
        MovieInfo correctMovie = movieInfoRepository.findById(getTodaysMovie(date)).get();

        KeyWord[] correctKeyWords = new Gson().fromJson(
                correctMovie.getKeyWords(), KeyWord[].class
        );
        for(KeyWord kw : correctKeyWords){
            if(!knownKeyWords.contains(kw)){
                return kw;
            }
        }
        return null;
    }

    public String getTaglineHint(String date) {
        return movieInfoRepository.findById(getTodaysMovie(date)).get().getTagline();
    }

    public String getCorrectTitle(String date) {
        return movieInfoRepository.findById(getTodaysMovie(date)).get().getTitle();
    }

    public GuessDTO getRandomMovie(List<GuessDTO> guessedMovies, String date) {
        MovieInfo correctMovie = movieInfoRepository.findById(getTodaysMovie(date)).get();
        Random random = new Random();
        int id;
        do{
            id = random.nextInt(1,453);
        }while(!movieInfoRepository.findById(id).isPresent()
        || guessedMovies.stream().anyMatch((m)->{return m.getGuessTitle().equals(correctMovie.getTitle());})
        || (id == getTodaysMovie(date)));
        return checkIfMovieIsCorrect(id, date);
    }
}
