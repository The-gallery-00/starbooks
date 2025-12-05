// com.starbooks.service.book.ExternalBookApiServiceImpl.java
package com.starbooks.service.book;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.starbooks.dto.book.BookDetailDto;
import com.starbooks.dto.book.BookSearchDto;
import com.starbooks.dto.book.PopularBookDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ExternalBookApiServiceImpl implements ExternalBookApiService {

    @Value("${data4library.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();


    @Override
    public List<BookSearchDto> searchBooks(String keyword, int page, int size) {
        try {
            String url = "http://data4library.kr/api/srchBooks"
                    + "?authKey=" + apiKey
                    + "&keyword=" + UriUtils.encode(keyword, StandardCharsets.UTF_8)
                    + "&pageNo=" + page
                    + "&pageSize=" + size
                    + "&format=json";

            log.info("📡 도서 검색 요청 URL: {}", url);

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response == null || !response.containsKey("response")) return List.of();

            Map<String, Object> res = (Map<String, Object>) response.get("response");
            if (!res.containsKey("docs")) return List.of();

            List<Map<String, Object>> docs = (List<Map<String, Object>>) res.get("docs");
            if (docs == null) return List.of();

            List<BookSearchDto> results = new ArrayList<>();
            for (Map<String, Object> doc : docs) {
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

        } catch (Exception e) {
            log.error("도서 검색 실패", e);
            return List.of();
        }
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
    @Override
    public List<PopularBookDto> getPopularBooks(
            String startDt,
            String endDt,
            String gender,
            String age,
            String region,
            String addCode,
            String kdc,
            Integer pageNo,
            Integer pageSize
    ) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl("http://data4library.kr/api" + "/loanItemSrch")
                .queryParam("authKey", apiKey)
                .queryParam("format", "json")
                .queryParam("startDt", startDt)
                .queryParam("endDt", endDt)
                .queryParam("pageNo", pageNo != null ? pageNo : 1)
                .queryParam("pageSize", pageSize != null ? pageSize : 10);

        if (gender != null && !gender.isBlank()) {
            builder.queryParam("gender", gender);
        }
        if (age != null && !age.isBlank()) {
            builder.queryParam("age", 30);
        }
        if (region != null && !region.isBlank()) {
            builder.queryParam("region", region);
        }
        if (addCode != null && !addCode.isBlank()) {
            builder.queryParam("addCode", addCode);
        }
        if (kdc != null && !kdc.isBlank()) {
            builder.queryParam("kdc", kdc);
        }

        String url = builder.toUriString();
        log.info("인기도서 요청 URL = {}", url);

        try {
            String body = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(body);

            // response.docs[*].doc 안에 실제 책 정보가 들어있음
            JsonNode docs = root.path("response").path("docs");

            List<PopularBookDto> result = new ArrayList<>();
            for (JsonNode wrapper : docs) {
                JsonNode doc = wrapper.path("doc");

                PopularBookDto dto = PopularBookDto.builder()
                        .isbn13(doc.path("isbn13").asText(null))
                        .title(doc.path("bookname").asText(null))
                        .authors(doc.path("authors").asText(null))
                        .publisher(doc.path("publisher").asText(null))
                        .pubYear(doc.path("publication_year").asText(null))
                        .loanCnt(doc.path("loanCnt").asInt(0))
                        .bookImageUrl(doc.path("bookImageURL").asText(null))
                        .build();

                result.add(dto);
            }
            return result;

        } catch (Exception e) {
            log.error("인기 도서 조회 실패", e);
            throw new RuntimeException("인기 도서 조회 중 오류가 발생했습니다.");
        }
    }
}
