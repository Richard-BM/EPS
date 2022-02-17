using AutoMapper;
using EPS.Dtos.Response;
using EPS.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EPS.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TblClient, ClientResponse>()
                .ForMember(dest => dest.ClientId, opt => opt.MapFrom(src => src.IdClient))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));

            CreateMap<TblPerson, PersonResponse>()
                .ForMember(dest => dest.PersonId, opt => opt.MapFrom(src => src.IdPerson))
                .ForMember(dest => dest.Firstname, opt => opt.MapFrom(src => src.Firstname))
                .ForMember(dest => dest.Lastname, opt => opt.MapFrom(src => src.Lastname))
                .ForMember(dest => dest.EMail, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.DateOfBirth, opt => opt.MapFrom(src => src.DateOfBirth));

            CreateMap<TblProject, ProjectResponse>()
                .ForMember(dest => dest.projectId, opt => opt.MapFrom(src => src.IdProject))
                .ForMember(dest => dest.projectName, opt => opt.MapFrom(src => src.ProjectName))
                .ForMember(dest => dest.projectNumber, opt => opt.MapFrom(src => src.ProjectNumber))
                .ForMember(dest => dest.projectDescription, opt => opt.MapFrom(src => src.ProjectDescription))
                .ForMember(dest => dest.clientResponse, opt => opt.MapFrom(src => src.IdClientNavigation));

            CreateMap<TblLocation, LocationResponse>()
                .ForMember(dest => dest.locationId, opt => opt.MapFrom(src => src.IdLocation))
                .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.street, opt => opt.MapFrom(src => src.Street))
                .ForMember(dest => dest.postalcode, opt => opt.MapFrom(src => src.Postalcode))
                .ForMember(dest => dest.city, opt => opt.MapFrom(src => src.City));

            CreateMap<TblAppointment, AppointmentResponse>()
                .ForMember(dest => dest.AppointmentId, opt => opt.MapFrom(src => src.IdAppointment))
                .ForMember(dest => dest.personResponse, opt => opt.MapFrom(src => src.IdPersonNavigation))
                .ForMember(dest => dest.projectResponse, opt => opt.MapFrom(src => src.IdProjectNavigation))
                .ForMember(dest => dest.locationResponse, opt => opt.MapFrom(src => src.IdLocationNavigation))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate));
        }
    }
}
