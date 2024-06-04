package com.example.demo.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Movie;

/**
 * MovieModal
 */

@Repository
public interface MoviesRepository extends ListCrudRepository<Movie, Integer> {

}