using AutoMapper;
using EPS.Dtos.Request;
using EPS.Dtos.Response;
using EPS.models;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [ApiController]
    [SwaggerResponse(401, "The JWT is missing or invalid")]
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

        /// <summary>
        /// Creates a new client
        /// </summary>
        /// <remarks>Creates a new client</remarks>
        /// <param name="clientCreationRequest"></param>
        /// <returns></returns>
        [HttpPost("/Client/Clients/")]
        [SwaggerResponse(201, "The appointment was successfully created", typeof(void))]
        public async Task<IActionResult> Create(ClientCreationRequest clientCreationRequest)
        {
            TblClient client = new TblClient
            {
                IdClient = Guid.NewGuid(),
                Name = clientCreationRequest.Name
            };

            await _planningSystemContext.TblClients.AddAsync(client);
            await _planningSystemContext.SaveChangesAsync();
            return Created("", client.IdClient);
        }

        /// <summary>
        /// Updates a client
        /// </summary>
        /// <remarks>Updates a client</remarks>
        /// <param name="clientId">The clientId from the client</param>
        /// <param name="clientEditRequest"></param>
        /// <returns></returns>
        [HttpPut("/Client/Clients/{clientId}")]
        [SwaggerResponse(204, "The client was successfully updated", typeof(void))]
        [SwaggerResponse(404, "The client with the given id was not found", typeof(void))]
        public async Task<IActionResult> UpdateClient(Guid clientId, ClientEditRequest clientEditRequest)
        {
            TblClient client = await _planningSystemContext.TblClients.Where(x => x.IdClient == clientId).FirstOrDefaultAsync();

            if (client == null)
                return NotFound("invalid clientId");
            else
            {
                client.Name = clientEditRequest.Name;

                await _planningSystemContext.SaveChangesAsync();

                return NoContent();
            }
        }

        /// <summary>
        /// Deletes a client with the given clientId
        /// </summary>
        /// <remarks>Deletes a client with the given clientId</remarks>
        /// <param name="clientId">The clientId from the client to be deleted</param>
        /// <returns></returns>
        [HttpDelete("/Client/Clients/{clientId}")]
        [SwaggerResponse(204, "The client was successfully deleted", typeof(void))]
        [SwaggerResponse(404, "The client was not found. Maybe it's already deleted.", typeof(void))]
        public async Task<IActionResult> Delete(System.Guid clientId)
        {
            TblClient client = await _planningSystemContext.TblClients.Where(x => x.IdClient == clientId).FirstOrDefaultAsync();

            if (client == null)
                return NotFound("The client was not found. Maybe it's already deleted");
            else
            {
                List<TblProject> projects = await _planningSystemContext.TblProjects.Where(x => x.IdClient == clientId).ToListAsync();

                foreach (TblProject project in projects)
                    project.IdClient = null;

                _planningSystemContext.TblClients.Remove(client);
                await _planningSystemContext.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
