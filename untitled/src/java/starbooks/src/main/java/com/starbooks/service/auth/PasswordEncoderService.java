package java.starbooks.src.main.java.com.starbooks.service.auth;

public interface PasswordEncoderService {
    String encode(String rawPassword);
    boolean matches(String rawPassword, String encodedPassword);
}
