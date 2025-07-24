using AuthApi.DTOs;
using AuthApi.Helpers;
using AuthApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace AuthApi.Services {
    public class AuthService {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JwtHelper _jwtHelper;

        public AuthService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration) {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtHelper = new JwtHelper(configuration);
        }

        public async Task<AuthResult> Register(RegisterDTO dto) {
            if (!await _roleManager.RoleExistsAsync(dto.Role!))
                await _roleManager.CreateAsync(new IdentityRole(dto.Role!));

            var user = new User { UserName = dto.Username };
            var result = await _userManager.CreateAsync(user, dto.Password!);

            if (!result.Succeeded)
                return new AuthResult {
                    IsAuthSuccessful = false,
                    ErrorMessage = string.Join(", ", result.Errors.Select(e => e.Description))
                };

            await _userManager.AddToRoleAsync(user, dto.Role!);
            return await GenerateAuthResult(user);
        }

        public async Task<AuthResult> Login(LoginDTO dto) {
            var user = await _userManager.FindByNameAsync(dto.Username!);
            if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password!))
                return new AuthResult {
                    IsAuthSuccessful = false,
                    ErrorMessage = "Invalid username or password."
                };

            return await GenerateAuthResult(user);
        }

        private async Task<AuthResult> GenerateAuthResult(User user) {
            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtHelper.GenerateJwtToken(user, roles);
            return new AuthResult {
                IsAuthSuccessful = true,
                Username = user.UserName,
                Role = roles.FirstOrDefault(),
                Token = token
            };
        }
    }
}
