package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.OmbdMovieResponseDto;
import com.example.demo.dtos.OmdbSearchResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.*;
import java.io.*;

@Service
public class MovieService {

    // http://www.omdbapi.com/?apikey=ede8b74c&t=robot

    @Value("${ombd.access.key}")
    private String secretKey;

    private String url = "http://www.omdbapi.com/?apikey=";

    public MovieService() {
    }

    public OmbdMovieResponseDto getMovie(String omdbId) {
        try {
            URI uri = URI.create(url + secretKey + "&i=" + omdbId);
            URL url = URL.of(uri, null);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            String myJsonString = content.toString();
            ObjectMapper om = new ObjectMapper();
            OmbdMovieResponseDto omdbMovie = om.readValue(myJsonString, OmbdMovieResponseDto.class);

            return omdbMovie;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }

    public OmdbSearchResponseDto searchMovie(String name) {
        try {
            URI uri = URI.create(url + secretKey + "&s=" + name);
            URL url = URL.of(uri, null);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            String myJsonString = content.toString();
            ObjectMapper om = new ObjectMapper();
            OmdbSearchResponseDto searchResponse = om.readValue(myJsonString, OmdbSearchResponseDto.class);
            return searchResponse;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;

    }

}
