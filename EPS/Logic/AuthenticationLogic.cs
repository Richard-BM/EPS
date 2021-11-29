using EPS.Logic.Interfaces;
using EPS.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EPS.Logic
{
    public class AuthenticationLogic : IAuthenticationLogic
    {
        private readonly PlanningSystemContext _planningSystemContext;
        private readonly ILogger<AuthenticationLogic> _logger;
        private readonly IConfiguration _configuration;

        public AuthenticationLogic(ILogger<AuthenticationLogic> logger, PlanningSystemContext planningSystemContext, IConfiguration configuration)
        {
            _planningSystemContext = planningSystemContext;
            _logger = logger;
            _configuration = configuration;
        }

        /// <summary>
        /// Tries to authenticate a user with the given credentials and returns the user if authentication is successfully
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <returns>The successfully authenticated user. Can be null</returns>
        public async Task<TblPerson> TryAuthenticateUser(string email, string password)
        {
            if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(password))
            {
                email = email.Trim().ToLower();
                password = password.Trim();

                TblPerson person = await _planningSystemContext.TblPeople.Where(person => 
                     person.Email.Trim().ToLower() == email)
                    .FirstOrDefaultAsync();

                if (person != null)
                {
                    byte[] passwordHash = System.Security.Cryptography.MD5.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                    if (passwordHash.SequenceEqual(person.Password))
                        return person;
                }
            }

            return null;
        }

        /// <summary>
        /// Generates a Json Web Token for a user to authenticate with the API
        /// </summary>
        /// <param name="person"></param>
        /// <returns>The Json Web Token</returns>
        public string GenerateJwtForUser(TblPerson person)
        {
            if (person != null)
            {
                var claims = new[]
                {
                        new Claim(ClaimTypes.NameIdentifier, person.IdPerson.ToString()),
                        new Claim(ClaimTypes.GivenName, person.Firstname),
                        new Claim(ClaimTypes.Surname, person.Lastname),
                        new Claim(ClaimTypes.Locality, "de-DE")
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["JWT-Token-Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddHours(24),
                    SigningCredentials = creds
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(token);
            }

            return null;
        }
    }
}
