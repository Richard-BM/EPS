using AutoMapper;
using EPS.Dtos.Response;
using EPS.models;
using Microsoft.AspNetCore.Authorization;
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
    }
}
