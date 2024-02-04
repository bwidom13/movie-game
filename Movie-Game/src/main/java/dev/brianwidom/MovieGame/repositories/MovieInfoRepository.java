package dev.brianwidom.MovieGame.repositories;

import dev.brianwidom.MovieGame.entities.MovieInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieInfoRepository extends JpaRepository<MovieInfo, Integer> {
    public List<MovieInfo> findByTitleLikeOrderByTitle(String title);
}
