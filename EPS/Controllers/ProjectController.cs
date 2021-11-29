using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using EPS.models;
using Microsoft.EntityFrameworkCore;
using EPS.Dtos.Response;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Authorization;

namespace EPS.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    [SwaggerResponse(401, "The JWT is missing or invalid")]
    public class ProjectController : ControllerBase
    {
        private readonly PlanningSystemContext _planningSystemContext;
        private readonly IMapper _mapper;

        public ProjectController(PlanningSystemContext planningSystemContext, IMapper mapper)
        {
            _planningSystemContext = planningSystemContext;
            _mapper = mapper;
        }

        /// <summary>
        /// Returns a list of projects
        /// </summary>
        /// <remarks>Returns all projects in database.</remarks>
        /// <returns></returns>
        [HttpGet("/Project/Projects")]
        [SwaggerResponse(200, "List of projects", typeof(IList<ProjectResponse>))]
        [SwaggerResponse(404, "No projects could be found", typeof(void))]
        public async Task<IActionResult> GetLocations()
        {
            List<TblProject> projects = await _planningSystemContext.TblProjects
                .Include(x => x.IdClientNavigation)
                .ToListAsync();

            if (projects == null)
                return NotFound("No projects could be found");
            else
                return Ok(_mapper.Map<List<ProjectResponse>>(projects));
        }

        /// <summary>
        /// Returns a single project
        /// </summary>
        /// <remarks>Returns a single project from database.</remarks>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet("/Project/Project/{projectId}")]
        [SwaggerResponse(200, "Single project", typeof(IList<ProjectResponse>))]
        [SwaggerResponse(404, "A project with the specified Id could not be found", typeof(void))]
        public async Task<IActionResult> GetProjectsById(System.Guid projectId)
        {
            TblProject project = await _planningSystemContext.TblProjects
                .Include(x => x.IdClientNavigation)
                .Where(x => x.IdProject == projectId).FirstOrDefaultAsync();

            if (project == null)
                return NotFound("A project with the specified Id could not be found");
            else
                return Ok(_mapper.Map<ProjectResponse>(project));
        }
    }
}
