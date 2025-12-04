// src/main/java/com/starbooks/service/external/BookExternalApiService.java
package com.starbooks.service.external;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.starbooks.dto.external.BookDetailDto;
import com.starbooks.dto.external.BookSimpleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookExternalApiService {

    @Value("${info.book.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // =============================
    // 1) ISBN으로 책 상세정보 조회
    // =============================
    public BookDetailDto getBookDetailByIsbn(String isbn13) {
        // 도서관 정보나루 책 상세 API URL (예시)
        String url = "https://data4library.kr/api/itemSrch"
                + "?authKey=" + apiKey
                + "&libCode=" + 127058     // ← 도서관 코드
                + "&startDt=" + 20250101     // ← 20250101
                + "&endDt=" + 20251204         // ← 20251204
                + "&format=json";


        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("도서관 정보나루 API 호출 실패 (상세정보)");
        }

        return parseBookDetail(response.getBody());
    }

    // =============================
    // 2) 인기 도서(대출 베스트) 목록
    // =============================
    public List<BookSimpleDto> getBestBooks(String startDt, String endDt) {
        String url = "http://data4library.kr/api/loanItemSrch"
                + "?authKey=" + apiKey
                + "&startDt=" + 20250101     // 20250101
                + "&endDt=" + 20251203         // 20251203
                + "&age=a17;20;30;40"       // 연령대 필터
                + "&format=json";

        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("도서관 정보나루 API 호출 실패 (인기 도서)");
        }

        return parseBestBooks(response.getBody());
    }

    // =============================
    // JSON 파싱 로직
    // =============================
    private BookDetailDto parseBookDetail(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);

            // 실제 응답 구조는 정보나루 문서/예시 JSON 기준으로 맞춰줘야 함
            // 예시 구조 (가정):
            // {
            //   "response": {
            //     "detail": [
            //       {
            //         "book": {
            //           "bookname": "...",
            //           "authors": "...",
            //           "publisher": "...",
            //           "publication_year": "...",
            //           "isbn13": "...",
            //           "bookImageURL": "...",
            //           "description": "..."
            //         }
            //       }
            //     ]
            //   }
            // }

            JsonNode detailNode = root.path("response").path("detail");
            if (!detailNode.isArray() || detailNode.size() == 0) {
                return null;
            }

            JsonNode bookNode = detailNode.get(0).path("book");

            return BookDetailDto.builder()
                    .title(bookNode.path("bookname").asText(null))
                    .author(bookNode.path("authors").asText(null))
                    .publisher(bookNode.path("publisher").asText(null))
                    .pubYear(bookNode.path("publication_year").asText(null))
                    .isbn13(bookNode.path("isbn13").asText(null))
                    .bookImageUrl(bookNode.path("bookImageURL").asText(null))
                    .description(bookNode.path("description").asText(null))
                    .build();

        } catch (IOException e) {
            throw new RuntimeException("도서관 정보나루 상세 JSON 파싱 실패", e);
        }
    }

    private List<BookSimpleDto> parseBestBooks(String json) {
        List<BookSimpleDto> result = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(json);

            // 예시 구조 (가정):
            // {
            //   "response": {
            //     "docs": [
            //       {
            //         "book": {
            //           "bookname": "...",
            //           "authors": "...",
            //           "isbn13": "...",
            //           "bookImageURL": "..."
            //         }
            //       },
            //       ...
            //     ]
            //   }
            // }

            JsonNode docsNode = root.path("response").path("docs");
            if (!docsNode.isArray()) {
                return result;
            }

            for (JsonNode doc : docsNode) {
                JsonNode bookNode = doc.path("book");

                BookSimpleDto dto = BookSimpleDto.builder()
                        .title(bookNode.path("bookname").asText(null))
                        .author(bookNode.path("authors").asText(null))
                        .isbn13(bookNode.path("isbn13").asText(null))
                        .bookImageUrl(bookNode.path("bookImageURL").asText(null))
                        .build();

                result.add(dto);
            }

            return result;

        } catch (IOException e) {
            throw new RuntimeException("도서관 정보나루 인기 도서 JSON 파싱 실패", e);
        }
    }
}
