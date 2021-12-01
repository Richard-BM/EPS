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
using EPS.Dtos.Request;

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

        /// <summary>
        /// Creates a new project
        /// </summary>
        /// <remarks>Creates a new project</remarks>
        /// <param name="projectCreationRequest"></param>
        /// <returns></returns>
        [HttpPost("/Project/Project/")]
        [SwaggerResponse(201, "The appointment was successfully created", typeof(void))]
        public async Task<IActionResult> Create(ProjectCreationRequest projectCreationRequest)
        {
            TblProject project = new TblProject
            {
                IdProject = Guid.NewGuid(),
                IdClient = projectCreationRequest.ClientId,
                ProjectName = projectCreationRequest.Name,
                ProjectNumber = projectCreationRequest.Number,
                ProjectDescription = projectCreationRequest.Description

            };

            await _planningSystemContext.TblProjects.AddAsync(project);
            await _planningSystemContext.SaveChangesAsync();
            return Created("", project.IdProject);
        }



        /// <summary>
        /// Deletes a project with the given projectId
        /// </summary>
        /// <remarks>Deletes a project with the given projectId</remarks>
        /// <param name="projectId">The projectId from the project to be deleted</param>
        /// <returns></returns>
        [HttpDelete("/Project/Project/{projectId}")]
        [SwaggerResponse(204, "The project was successfully deleted", typeof(void))]
        [SwaggerResponse(404, "The project was not found. Maybe it's already deleted.", typeof(void))]
        public async Task<IActionResult> Delete(System.Guid projectId)
        {
            TblProject project = await _planningSystemContext.TblProjects.Where(x => x.IdProject == projectId).FirstOrDefaultAsync();

            if (project == null)
                return NotFound("The project was not found. Maybe it's already deleted");
            else
            {
                List<TblAppointment> appointments = await _planningSystemContext.TblAppointments.Where(x => x.IdProject == projectId).ToListAsync();

                foreach (TblAppointment appointment in appointments)
                    appointment.IdProject = null;

                _planningSystemContext.TblProjects.Remove(project);
                await _planningSystemContext.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
