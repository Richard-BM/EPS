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

namespace EPS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        [HttpGet("/Appointment/Appointments/{appointmentId}")]
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
    }
}
