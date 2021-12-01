using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EPS.models;
using EPS.Dtos.Response;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Authorization;

namespace EPS.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    [SwaggerResponse(401, "The JWT is missing or invalid")]
    public class PersonController : ControllerBase
    {
        private readonly PlanningSystemContext _planningSystemContext;
        private readonly IMapper _mapper;

        public PersonController(PlanningSystemContext planningSystemContext, IMapper mapper)
        {
            _planningSystemContext = planningSystemContext;
            _mapper = mapper;
        }

        /// <summary>
        /// Returns a list of persons
        /// </summary>
        /// <remarks>Returns all persons in database.</remarks>
        /// <returns></returns>
        [HttpGet("/Person/Persons")]
        [SwaggerResponse(200, "List of persons", typeof(IList<PersonResponse>))]
        [SwaggerResponse(404, "No persons could be found", typeof(void))]
        public async Task<IActionResult> GetLocations()
        {
            List<TblPerson> person = await _planningSystemContext.TblPeople.ToListAsync();

            if (person == null)
                return NotFound("No persons could be found");
            else
                return Ok(_mapper.Map<List<PersonResponse>>(person));
        }

        /// <summary>
        /// Returns a single person
        /// </summary>
        /// <remarks>Returns a single person from database.</remarks>
        /// <param name="personId"></param>
        /// <returns></returns>
        [HttpGet("/Person/Persons/{personId}")]
        [SwaggerResponse(200, "Single person", typeof(PersonResponse))]
        [SwaggerResponse(404, "A person with the specified Id could not be found", typeof(void))]
        public async Task<IActionResult> GetProjectsById(System.Guid personId)
        {
            TblPerson person = await _planningSystemContext.TblPeople.Where(x => x.IdPerson == personId).FirstOrDefaultAsync();

            if (person == null)
                return NotFound("A person with the specified Id could not be found");
            else
                return Ok(_mapper.Map<PersonResponse>(person));
        }

        /// <summary>
        /// Deletes a person with the given personId
        /// </summary>
        /// <remarks>Deletes a person with the given locationId</remarks>
        /// <param name="personId">The personId from the person to be deleted</param>
        /// <returns></returns>
        [HttpDelete("/Person/Persons/{personId}")]
        [SwaggerResponse(204, "The person was successfully deleted", typeof(void))]
        [SwaggerResponse(404, "The person was not found. Maybe it's already deleted.", typeof(void))]
        public async Task<IActionResult> Delete(System.Guid personId)
        {
            TblPerson person = await _planningSystemContext.TblPeople.Where(x => x.IdPerson == personId).FirstOrDefaultAsync();

            if (person == null)
                return NotFound("The person was not found. Maybe it's already deleted");
            else
            {
                List<TblAppointment> appointments = await _planningSystemContext.TblAppointments.Where(x => x.IdPerson == personId).ToListAsync();

                foreach (TblAppointment appointment in appointments)
                    appointment.IdPerson = null;

                _planningSystemContext.TblPeople.Remove(person);
                await _planningSystemContext.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
