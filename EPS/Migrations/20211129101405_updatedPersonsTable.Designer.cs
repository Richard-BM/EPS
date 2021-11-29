﻿// <auto-generated />
using System;
using EPS.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EPS.Migrations
{
    [DbContext(typeof(PlanningSystemContext))]
    [Migration("20211129101405_updatedPersonsTable")]
    partial class updatedPersonsTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EPS.models.TblAppointment", b =>
                {
                    b.Property<Guid>("IdAppointment")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Appointment")
                        .HasDefaultValueSql("(newid())");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("IdLocation")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Location");

                    b.Property<Guid?>("IdPerson")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Person");

                    b.Property<Guid?>("IdProject")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Project");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("IdAppointment");

                    b.HasIndex("IdLocation");

                    b.HasIndex("IdPerson");

                    b.HasIndex("IdProject");

                    b.ToTable("tbl_Appointment");
                });

            modelBuilder.Entity("EPS.models.TblClient", b =>
                {
                    b.Property<Guid>("IdClient")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Client")
                        .HasDefaultValueSql("(newid())");

                    b.Property<string>("Name")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("IdClient");

                    b.ToTable("tbl_Client");
                });

            modelBuilder.Entity("EPS.models.TblLocation", b =>
                {
                    b.Property<Guid>("IdLocation")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Location")
                        .HasDefaultValueSql("(newid())");

                    b.Property<string>("City")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Postalcode")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Street")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("IdLocation");

                    b.ToTable("tbl_Location");
                });

            modelBuilder.Entity("EPS.models.TblPerson", b =>
                {
                    b.Property<Guid>("IdPerson")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Person")
                        .HasDefaultValueSql("(newid())");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)")
                        .HasColumnName("EMail");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("IdPerson");

                    b.ToTable("tbl_Person");
                });

            modelBuilder.Entity("EPS.models.TblProject", b =>
                {
                    b.Property<Guid>("IdProject")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Project")
                        .HasDefaultValueSql("(newid())");

                    b.Property<Guid>("IdClient")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("ID_Client");

                    b.Property<string>("ProjectDescription")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("ProjectName")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("ProjectNumber")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("IdProject");

                    b.HasIndex("IdClient");

                    b.ToTable("tbl_Project");
                });

            modelBuilder.Entity("EPS.models.TblAppointment", b =>
                {
                    b.HasOne("EPS.models.TblLocation", "IdLocationNavigation")
                        .WithMany("TblAppointments")
                        .HasForeignKey("IdLocation")
                        .HasConstraintName("FK_tbl_Appointment_tbl_Location");

                    b.HasOne("EPS.models.TblPerson", "IdPersonNavigation")
                        .WithMany("TblAppointments")
                        .HasForeignKey("IdPerson")
                        .HasConstraintName("FK_tbl_Appointment_tbl_Person");

                    b.HasOne("EPS.models.TblProject", "IdProjectNavigation")
                        .WithMany("TblAppointments")
                        .HasForeignKey("IdProject")
                        .HasConstraintName("FK_tbl_Appointment_tbl_Project");

                    b.Navigation("IdLocationNavigation");

                    b.Navigation("IdPersonNavigation");

                    b.Navigation("IdProjectNavigation");
                });

            modelBuilder.Entity("EPS.models.TblProject", b =>
                {
                    b.HasOne("EPS.models.TblClient", "IdClientNavigation")
                        .WithMany("TblProjects")
                        .HasForeignKey("IdClient")
                        .HasConstraintName("FK_tbl_Project_tbl_Client")
                        .IsRequired();

                    b.Navigation("IdClientNavigation");
                });

            modelBuilder.Entity("EPS.models.TblClient", b =>
                {
                    b.Navigation("TblProjects");
                });

            modelBuilder.Entity("EPS.models.TblLocation", b =>
                {
                    b.Navigation("TblAppointments");
                });

            modelBuilder.Entity("EPS.models.TblPerson", b =>
                {
                    b.Navigation("TblAppointments");
                });

            modelBuilder.Entity("EPS.models.TblProject", b =>
                {
                    b.Navigation("TblAppointments");
                });
#pragma warning restore 612, 618
        }
    }
}