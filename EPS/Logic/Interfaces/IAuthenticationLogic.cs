using EPS.models;
using System.Threading.Tasks;

namespace EPS.Logic.Interfaces
{
    public interface IAuthenticationLogic
    {
        Task<TblPerson> TryAuthenticateUser(string username, string password);
        string GenerateJwtForUser(TblPerson person);
    }
}
