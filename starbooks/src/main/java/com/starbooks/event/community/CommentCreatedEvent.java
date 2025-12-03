// com.starbooks.event.community.CommentCreatedEvent
package com.starbooks.event.community;

public record CommentCreatedEvent(Long postOwnerId, Long commenterId, Long postId) {}
