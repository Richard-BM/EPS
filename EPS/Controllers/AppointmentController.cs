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
    public class AppointmentController : ControllerBase
    {
        private readonly PlanningSystemContext _planningSystemContext;
        private readonly IMapper _mapper;

        public AppointmentController(PlanningSystemContext planningSystemContext, IMapper mapper)
        {
            _planningSystemContext = planningSystemContext;
            _mapper = mapper;
        }


        /// <summary>
        /// Returns a list of appointments
        /// </summary>
        /// <remarks>Returns all appointments in database.</remarks>
        /// <returns></returns>
        [HttpGet("/Appointment/Appointments")]
        [SwaggerResponse(200, "List of appointments", typeof(IList<AppointmentResponse>))]
        [SwaggerResponse(404, "No appointments could be found", typeof(void))]
        public async Task<IActionResult> GetAppointments()
        {
            List<TblAppointment> appointments = await _planningSystemContext.TblAppointments
                .Include(x => x.IdLocationNavigation)
                .Include(x => x.IdPersonNavigation)
                .Include(x => x.IdProjectNavigation)
                    .ThenInclude(x => x.IdClientNavigation)
                .ToListAsync();

            if (appointments == null)
                return NotFound("No appointments could be found");
            else
                return Ok(_mapper.Map<List<AppointmentResponse>>(appointments));
        }

        /// <summary>
        /// Returns a single appointment
        /// </summary>
        /// <remarks>Returns all appointments in database.</remarks>
        /// <param name="appointmentId"></param>
        /// <returns></returns>
        [HttpGet("/Appointment/{appointmentId}")]
        [SwaggerResponse(200, "Single appointment", typeof(AppointmentResponse))]
        [SwaggerResponse(404, "A appointment with the specified Id could not be found", typeof(void))]
        public async Task<IActionResult> GetClientById(System.Guid appointmentId)
        {
            TblAppointment appointment = await _planningSystemContext.TblAppointments.Where(x => x.IdAppointment == appointmentId).FirstOrDefaultAsync();

            if (appointment == null)
                return NotFound("A appointment with the specified Id could not be found");
            else
                return Ok(_mapper.Map<AppointmentResponse>(appointment));
        }

        /// <summary>
        /// Creates a new appointment
        /// </summary>
        /// <remarks>Creates a new appointment</remarks>
        /// <param name="appointmentCreationRequest"></param>
        /// <returns></returns>
        [HttpPost("/Appointment/")]
        [SwaggerResponse(201, "The appointment was successfully created", typeof(void))]
        public async Task<IActionResult> Create(AppointmentCreationRequest appointmentCreationRequest)
        {
            TblAppointment appointment = new TblAppointment
            {
                IdAppointment = Guid.NewGuid(),
                IdPerson = appointmentCreationRequest.AssignedPersonId,
                IdLocation = appointmentCreationRequest.AssignedLocationId,
                IdProject = appointmentCreationRequest.AssignedProjectId,
                StartDate = appointmentCreationRequest.TimeFrom,
                EndDate = appointmentCreationRequest.TimeTo,
            };

            await _planningSystemContext.TblAppointments.AddAsync(appointment);
            await _planningSystemContext.SaveChangesAsync();
            return Created("", appointment.IdAppointment);
        }

        /// <summary>
        /// Updates a appointment
        /// </summary>
        /// <remarks>Updates a appointment</remarks>
        /// <param name="appointmentId">The appointmentId from the appointment</param>
        /// <param name="appointmentEditRequest"></param>
        /// <returns></returns>
        [HttpPut("/Appointment/{appointmentId}")]
        [SwaggerResponse(204, "The appointment was successfully updated", typeof(void))]
        [SwaggerResponse(404, "The appointment with the given id was not found", typeof(void))]
        public async Task<IActionResult> UpdateClient(Guid appointmentId, AppointmentEditRequest appointmentEditRequest)
        {
            TblAppointment appointment = await _planningSystemContext.TblAppointments.Where(x => x.IdAppointment == appointmentId).FirstOrDefaultAsync();

            if (appointment == null)
                return NotFound("invalid appointmentId");
            else
            {
                appointment.IdProject = appointmentEditRequest.AssignedProjectId;
                appointment.IdPerson = appointmentEditRequest.AssignedPersonId;
                appointment.IdLocation = appointmentEditRequest.AssignedLocationId;
                appointment.StartDate = appointmentEditRequest.TimeFrom;
                appointment.EndDate = appointmentEditRequest.TimeTo;

                await _planningSystemContext.SaveChangesAsync();

                return NoContent();
            }
        }

        /// <summary>
        /// Deletes a appointment with the given appointmentId
        /// </summary>
        /// <remarks>Deletes a appointment with the given appointmentId</remarks>
        /// <param name="appointmentId">The appointmentId from the appointment to be deleted</param>
        /// <returns></returns>
        [HttpDelete("/Appointment/{appointmentId}")]
        [SwaggerResponse(204, "The appointment was successfully deleted", typeof(void))]
        [SwaggerResponse(404, "The appointment was not found. Maybe it's already deleted.", typeof(void))]
        public async Task<IActionResult> Delete(System.Guid appointmentId)
        {
            TblAppointment appointment = await _planningSystemContext.TblAppointments.Where(x => x.IdAppointment == appointmentId).FirstOrDefaultAsync();

            if (appointment == null)
                return NotFound("The appointment was not found. Maybe it's already deleted");
            else
            {
                _planningSystemContext.TblAppointments.Remove(appointment);
                await _planningSystemContext.SaveChangesAsync();
                return NoContent();
            }
        }
    }
}
