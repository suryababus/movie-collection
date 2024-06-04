package com.example.demo.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.*;

@Entity
@Table(name = "movie_collection")
@Data
public class MovieCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private Integer owner;
    private boolean isPrivate;
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "collectionId")
    private List<Movie> movies;
}
