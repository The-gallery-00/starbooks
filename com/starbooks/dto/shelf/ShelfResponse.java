package com.starbooks.dto.shelf;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShelfResponse {

    private Long shelfId;
    private Long userId;
    private String shelfType;
}
