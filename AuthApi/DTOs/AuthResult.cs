namespace AuthApi.DTOs {
    public class AuthResult {
        public bool IsAuthSuccessful { get; set; }
        public string? Username { get; set; }
        public string? Role { get; set; }
        public string? Token { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
