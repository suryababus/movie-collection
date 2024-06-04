package com.example.demo.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

public class OmdbSearchResponseDto {
    @JsonProperty("Search")
    public ArrayList<Search> search;
    public String totalResults;
    @JsonProperty("Response")
    public String response;
}

class Search {
    @JsonProperty("Title")
    public String title;
    @JsonProperty("Year")
    public String year;
    public String imdbID;
    @JsonProperty("Type")
    public String type;
    @JsonProperty("Poster")
    public String poster;
}