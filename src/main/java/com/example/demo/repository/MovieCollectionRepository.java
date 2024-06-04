package com.example.demo.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.MovieCollection;

import java.util.List;

@Repository
public interface MovieCollectionRepository extends ListCrudRepository<MovieCollection, Integer> {

    List<MovieCollection> findByOwner(Integer id);

    @Query("select d from MovieCollection d where (:name is null or LOWER(d.name) like %:name%) and (d.isPrivate=false)")
    List<MovieCollection> filterCollectionByName(String name);
}
