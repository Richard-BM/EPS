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

namespace EPS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
    }
}
