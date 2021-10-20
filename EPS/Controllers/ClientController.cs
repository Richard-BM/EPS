using AutoMapper;
using EPS.Dtos.Response;
using EPS.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly PlanningSystemContext _planningSystemContext;
        private readonly IMapper _mapper;

        public ClientController(PlanningSystemContext planningSystemContext, IMapper mapper)
        {
            _planningSystemContext = planningSystemContext;
            _mapper = mapper;
        }

        /// <summary>
        /// Returns a list of clients
        /// </summary>
        /// <remarks>Returns all clients in database.</remarks>
        /// <returns></returns>
        [HttpGet("/Client/Clients")]
        [SwaggerResponse(200, "List of clients", typeof(IList<ClientResponse>))]
        [SwaggerResponse(404, "No Clients could be found", typeof(void))]
        public async Task<IActionResult> GetClients()
        {
            List<TblClient> clients = await _planningSystemContext.TblClients.ToListAsync();

            if (clients == null)
                return NotFound("No Clients could be found");
            else
                return Ok(_mapper.Map<List<ClientResponse>>(clients));
        }

        /// <summary>
        /// Returns a single client
        /// </summary>
        /// <remarks>Returns a single client from database.</remarks>
        /// <param name="clientId"></param>
        /// <returns></returns>
        [HttpGet("/Client/Clients/{clientId}")]
        [SwaggerResponse(200, "Single client", typeof(ClientResponse))]
        [SwaggerResponse(404, "A customer with the specified Id could not be found", typeof(void))]
        public async Task<IActionResult> GetClientById(System.Guid clientId)
        {
            TblClient client = await _planningSystemContext.TblClients.Where(x => x.IdClient == clientId).FirstOrDefaultAsync();

            if (client == null)
                return NotFound("A customer with the specified Id could not be found");
            else
                return Ok(_mapper.Map<ClientResponse>(client));
        }
    }
}
