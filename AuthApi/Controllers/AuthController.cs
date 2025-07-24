using AuthApi.DTOs;
using AuthApi.Services;
using Microsoft.AspNetCore.Mvc;
namespace AuthApi.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {
        private readonly AuthService _authService;
        public AuthController(AuthService authService) => _authService = authService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto) {
            var result = await _authService.Register(dto);
            return result.IsAuthSuccessful ? Ok(result) : BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto) {
            var result = await _authService.Login(dto);
            return result.IsAuthSuccessful ? Ok(result) : Unauthorized(result);
        }
    }
}
