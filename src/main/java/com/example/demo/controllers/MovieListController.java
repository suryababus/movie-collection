package com.example.demo.controllers;

import com.example.demo.entity.Movie;
import com.example.demo.entity.MovieCollection;
import com.example.demo.entity.User;
import com.example.demo.repository.MovieCollectionRepository;
import com.example.demo.repository.MoviesRepository;

import lombok.Data;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieListController {
    MovieCollectionRepository movieCollectionRepository;
    MoviesRepository moviesRepository;

    MovieListController(MovieCollectionRepository movieCollectionRepository, MoviesRepository moviesRepository) {
        this.movieCollectionRepository = movieCollectionRepository;
        this.moviesRepository = moviesRepository;
    }

    @GetMapping("/movieList")
    public ResponseEntity<List<MovieCollection>> getMovieColletions(
            @RequestParam String name) {
        System.out.println(name);
        return ResponseEntity
                .ok(this.movieCollectionRepository.filterCollectionByName(name.toLowerCase()));
    }

    @GetMapping("/movieList/me")
    public ResponseEntity<List<MovieCollection>> getMyMovieColletions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(this.movieCollectionRepository.findByOwner(currentUser.getId()));
    }

    @GetMapping("/movieList/{id}")
    public ResponseEntity<MovieCollection> getMovieCollection(@PathVariable String id) {
        MovieCollection movieCollection = this.movieCollectionRepository.findById(Integer.parseInt(id)).get();

        return ResponseEntity.ok(movieCollection);
    }

    @PostMapping("/movieList")
    public ResponseEntity<MovieCollection> getMovieCollection(
            @RequestBody MovieCollectionCreateRequest movieCollectionCreateRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        MovieCollection movieCollection = new MovieCollection();
        movieCollection.setName(movieCollectionCreateRequest.getName());
        movieCollection.setPrivate(movieCollectionCreateRequest.isPrivateCollection());
        movieCollection.setOwner(currentUser.getId());
        movieCollection.setDescription(movieCollectionCreateRequest.getDescription());

        return ResponseEntity.ok(this.movieCollectionRepository.save(movieCollection));
    }

    @PostMapping("/movieList/{id}/addMovie")
    public ResponseEntity<MovieCollection> getMovieToMovieCollection(@PathVariable String id,
            @RequestBody AddMovieRequest addMovieRequest) {

        Movie movie = new Movie();
        movie.setTitle(addMovieRequest.getName());
        movie.setYear(addMovieRequest.getYear());
        movie.setCollectionId(Integer.parseInt(id));
        movie.setImdbID(addMovieRequest.getImdbID());
        movie.setType(addMovieRequest.getType());
        movie.setPoster(addMovieRequest.getPoster());
        this.moviesRepository.save(movie);

        MovieCollection movieCollection = this.movieCollectionRepository.findById(Integer.parseInt(id)).get();

        return ResponseEntity.ok(movieCollection);
    }

}

@Data
class MovieCollectionCreateRequest {

    private String name;

    private String description;

    private boolean privateCollection;

}

@Data
class AddMovieRequest {
    private String name;
    private Integer year;
    private String imdbID;
    private String type;
    private String poster;
}