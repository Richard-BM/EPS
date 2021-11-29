using EPS.Dtos.Request;
using EPS.Dtos.Response;
using EPS.Logic.Interfaces;
using EPS.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System.Linq;
using System.Threading.Tasks;

namespace EPS.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        private readonly PlanningSystemContext _planningSystemContext;
        private readonly IAuthenticationLogic _authenticationLogic;

        public AuthenticationController(ILogger<AuthenticationController> logger, PlanningSystemContext planningSystemContext,
            IAuthenticationLogic authenticationLogic)
        {
            _logger = logger;
            _planningSystemContext = planningSystemContext;
            _authenticationLogic = authenticationLogic;
        }

        /// <summary>
        /// Authenticates a user and returns a Json Web Token to access the API
        /// </summary>
        /// <param name="authenticationRequest">Contains the credentions and other data to authenticate a user</param>
        [HttpPost("classic")]
        [SwaggerResponse(200, "Result of the authentication process", typeof(AuthenticationResponse))]
        public async Task<IActionResult> ClassicAuth(AuthenticationRequest authenticationRequest)
        {
            TblPerson person = await _authenticationLogic.TryAuthenticateUser(authenticationRequest.Email, authenticationRequest.Password);
            string token = null;
            string message = null;

            if (person != null)
            {
                token = _authenticationLogic.GenerateJwtForUser(person);
            }
            else
                message = "A user with the given credentials was not found";

            return Ok(new AuthenticationResponse(!string.IsNullOrWhiteSpace(token)
                , token, message));
        }

        [HttpPost("register")]
        [SwaggerResponse(200, "Result of the authentication process", typeof(AuthenticationResponse))]
        public async Task<IActionResult> RegisterAuth(RegisterRequest registerRequest)
        {
            registerRequest.Email = registerRequest.Email.Trim().ToLower();

            TblPerson person = await _planningSystemContext.TblPeople.Where(person =>
                person.Email.Trim().ToLower() == registerRequest.Email)
                .FirstOrDefaultAsync();

            if (person == null)
            {
                TblPerson newPerson = new TblPerson
                {
                    IdPerson = System.Guid.NewGuid(),
                    Firstname = registerRequest.firstname,
                    Lastname = registerRequest.lastname,
                    Email = registerRequest.Email,
                    Password = System.Security.Cryptography.MD5.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerRequest.Password)),
                    DateOfBirth = registerRequest.DateOfBirth
                };

                await _planningSystemContext.TblPeople.AddAsync(newPerson);
                await _planningSystemContext.SaveChangesAsync();

                string token = _authenticationLogic.GenerateJwtForUser(newPerson);
                string message = null;

                return Ok(new AuthenticationResponse(!string.IsNullOrWhiteSpace(token)
                , token, message));
            }
            else
                return Conflict("The username is already in use");
        }
    }
}
