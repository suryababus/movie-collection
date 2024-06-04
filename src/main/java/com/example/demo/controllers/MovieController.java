package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.OmbdMovieResponseDto;
import com.example.demo.dtos.OmdbSearchResponseDto;
import com.example.demo.service.MovieService;

@RestController
@ResponseBody
public class MovieController {

    private final MovieService movieService;

    MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/movies")
    public ResponseEntity<OmdbSearchResponseDto> searchMovies(@RequestParam String name) {
        OmdbSearchResponseDto response = this.movieService.searchMovie(name);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/movie")
    public ResponseEntity<OmbdMovieResponseDto> getMovie(@RequestParam String ombdId) {
        OmbdMovieResponseDto response = this.movieService.getMovie(ombdId);
        return ResponseEntity.ok(response);
    }
}
