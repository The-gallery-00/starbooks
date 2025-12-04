// com.starbooks.service.book.ExternalBookApiServiceImpl.java
package com.starbooks.service.book;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.starbooks.dto.book.BookDetailDto;
import com.starbooks.dto.book.BookSearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExternalBookApiServiceImpl implements ExternalBookApiService {

    @Value("${data4library.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();


    @Override
    public List<BookSearchDto> searchBooks(String keyword, int page, int size) {

        String url = "http://data4library.kr/api/srchBooks"
                + "?authKey=" + apiKey
                + "&keyword=" + keyword
                + "&pageNo=" + page
                + "&pageSize=" + size
                + "&format=json";

        System.out.println("📡 도서관 정보나루 검색 요청: " + url);

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        if (response == null || !response.containsKey("response")) {
            return List.of();
        }

        Map<String, Object> res = (Map<String, Object>) response.get("response");
        List<Map<String, Object>> docs = (List<Map<String, Object>>) res.get("docs");

        List<BookSearchDto> results = new ArrayList<>();

        for (Map<String, Object> docWrap : docs) {
            Map<String, Object> doc = (Map<String, Object>) docWrap.get("doc");

            BookSearchDto dto = BookSearchDto.builder()
                    .title((String) doc.get("bookname"))
                    .author((String) doc.get("authors"))
                    .publisher((String) doc.get("publisher"))
                    .isbn((String) doc.get("isbn13"))
                    .publicationYear((String) doc.get("publication_year"))
                    .bookImageUrl((String) doc.get("bookImageURL"))
                    .build();

            results.add(dto);
        }

        return results;
    }

    @Override
    public BookDetailDto getBookDetail(String isbn13) {

        String url = "http://data4library.kr/api/srchDtlList"
                + "?authKey=" + apiKey
                + "&isbn13=" + isbn13
                + "&loaninfoYN=Y"
                + "&format=json";

        try {
            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = objectMapper.readTree(response);
            JsonNode docs = root.path("response").path("detail").path(0).path("book");

            BookDetailDto dto = new BookDetailDto();
            dto.setIsbn(docs.path("isbn13").asText());
            dto.setTitle(docs.path("bookname").asText());
            dto.setAuthor(docs.path("authors").asText());
            dto.setPublisher(docs.path("publisher").asText());
            dto.setDescription(docs.path("description").asText());
            dto.setCoverImage(docs.path("bookImageURL").asText());

            return dto;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
