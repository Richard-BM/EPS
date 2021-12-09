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
    public class LocationController : ControllerBase
    {
        private readonly PlanningSystemContext _planningSystemContext;
        private readonly IMapper _mapper;

        public LocationController(PlanningSystemContext planningSystemContext, IMapper mapper)
        {
            _planningSystemContext = planningSystemContext;
            _mapper = mapper;
        }

        /// <summary>
        /// Returns a list of locations
        /// </summary>
        /// <remarks>Returns all locations in database.</remarks>
        /// <returns></returns>
        [HttpGet("/Location/Locations")]
        [SwaggerResponse(200, "List of locations", typeof(IList<LocationResponse>))]
        [SwaggerResponse(404, "No Locations could be found", typeof(void))]
        public async Task<IActionResult> GetLocations()
        {
            List<TblLocation> locations = await _planningSystemContext.TblLocations.ToListAsync();

            if (locations == null)
                return NotFound("No Locations could be found");
            else
                return Ok(_mapper.Map<List<LocationResponse>>(locations));
        }


        /// <summary>
        /// Returns a single location
        /// </summary>
        /// <remarks>Returns a single location from the database.</remarks>
        /// <param name="locationId"></param>
        /// <returns></returns>
        [HttpGet("/Location/Locations/{locationId}")]
        [SwaggerResponse(200, "Single location", typeof(LocationResponse))]
        [SwaggerResponse(404, "A location with the specified Id could not be found", typeof(void))]
        public async Task<IActionResult> GetClientById(System.Guid locationId)
        {
            TblLocation location = await _planningSystemContext.TblLocations.Where(x => x.IdLocation == locationId).FirstOrDefaultAsync();

            if (location == null)
                return NotFound("A location with the specified Id could not be found");
            else
                return Ok(_mapper.Map<LocationResponse>(location));
        }

        /// <summary>
        /// Creates a new location
        /// </summary>
        /// <remarks>Creates a new location</remarks>
        /// <param name="locationCreationRequest"></param>
        /// <returns></returns>
        [HttpPost("/Location/Locations/")]
        [SwaggerResponse(201, "The appointment was successfully created", typeof(void))]
        public async Task<IActionResult> Create(LocationCreationRequest locationCreationRequest)
        {
            TblLocation location = new TblLocation
            {
                IdLocation = Guid.NewGuid(),
                Name = locationCreationRequest.Name,
                Street = locationCreationRequest.Street,
                City = locationCreationRequest.City,
                Postalcode = locationCreationRequest.Postalcode
            };

            await _planningSystemContext.TblLocations.AddAsync(location);
            await _planningSystemContext.SaveChangesAsync();
            return Created("", location.IdLocation);
        }

        /// <summary>
        /// Updates a location
        /// </summary>
        /// <remarks>Updates a location</remarks>
        /// <param name="locationId">The locationId from the location</param>
        /// <param name="locationEditRequest"></param>
        /// <returns></returns>
        [HttpPut("/Location/Locations/{locationId}")]
        [SwaggerResponse(204, "The location was successfully updated", typeof(void))]
        [SwaggerResponse(404, "The location with the given id was not found", typeof(void))]
        public async Task<IActionResult> UpdateClient(Guid locationId, LocationEditRequest locationEditRequest)
        {
            TblLocation location = await _planningSystemContext.TblLocations.Where(x => x.IdLocation == locationId).FirstOrDefaultAsync();

            if (location == null)
                return NotFound("invalid locationId");
            else
            {
                location.Name = locationEditRequest.Name;
                location.Street = locationEditRequest.Street;
                location.Postalcode = locationEditRequest.Postalcode;
                location.City = locationEditRequest.City;

                await _planningSystemContext.SaveChangesAsync();

                return NoContent();
            }
        }


        /// <summary>
        /// Deletes a location with the given locationId
        /// </summary>
        /// <remarks>Deletes a location with the given locationId</remarks>
        /// <param name="locationId">The locationId from the location to be deleted</param>
        /// <returns></returns>
        [HttpDelete("/Location/Locations/{locationId}")]
        [SwaggerResponse(204, "The location was successfully deleted", typeof(void))]
        [SwaggerResponse(404, "The location was not found. Maybe it's already deleted.", typeof(void))]
        public async Task<IActionResult> Delete(System.Guid locationId)
        {
            TblLocation location = await _planningSystemContext.TblLocations.Where(x => x.IdLocation == locationId).FirstOrDefaultAsync();

            if (location == null)
                return NotFound("The location was not found. Maybe it's already deleted");
            else
            {
                List<TblAppointment> appointments = await _planningSystemContext.TblAppointments.Where(x => x.IdLocation == locationId).ToListAsync();

                foreach (TblAppointment appointment in appointments)
                    appointment.IdLocation = null;

                _planningSystemContext.TblLocations.Remove(location);
                await _planningSystemContext.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
