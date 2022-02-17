namespace EPS.Dtos.Response
{
    public class AuthenticationResponse
    {
        public AuthenticationResponse(bool success, string token, string message)
        {
            this.Success = success;
            this.Token = token;
            this.Message = message;
        }

        public bool Success { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
    }
}
