using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace EPS.models
{
    public partial class PlanningSystemContext : DbContext
    {
        public PlanningSystemContext()
        {
        }

        public PlanningSystemContext(DbContextOptions<PlanningSystemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAppointment> TblAppointments { get; set; }
        public virtual DbSet<TblClient> TblClients { get; set; }
        public virtual DbSet<TblLocation> TblLocations { get; set; }
        public virtual DbSet<TblPerson> TblPeople { get; set; }
        public virtual DbSet<TblProject> TblProjects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=127.0.0.1, 1234;Database=PlanningSystem;Trusted_Connection=false;User ID=EPS-API;Password=bpBtu7cMUURpD9hg;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<TblAppointment>(entity =>
            {
                entity.HasKey(e => e.IdAppointment);

                entity.ToTable("tbl_Appointment");

                entity.Property(e => e.IdAppointment)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Appointment");

                entity.Property(e => e.IdLocation).HasColumnName("ID_Location");

                entity.Property(e => e.IdPerson).HasColumnName("ID_Person");

                entity.Property(e => e.IdProject).HasColumnName("ID_Project");

                entity.HasOne(d => d.IdLocationNavigation)
                    .WithMany(p => p.TblAppointments)
                    .HasForeignKey(d => d.IdLocation)
                    .HasConstraintName("FK_tbl_Appointment_tbl_Location");

                entity.HasOne(d => d.IdPersonNavigation)
                    .WithMany(p => p.TblAppointments)
                    .HasForeignKey(d => d.IdPerson)
                    .HasConstraintName("FK_tbl_Appointment_tbl_Person");

                entity.HasOne(d => d.IdProjectNavigation)
                    .WithMany(p => p.TblAppointments)
                    .HasForeignKey(d => d.IdProject)
                    .HasConstraintName("FK_tbl_Appointment_tbl_Project");
            });

            modelBuilder.Entity<TblClient>(entity =>
            {
                entity.HasKey(e => e.IdClient);

                entity.ToTable("tbl_Client");

                entity.Property(e => e.IdClient)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Client");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblLocation>(entity =>
            {
                entity.HasKey(e => e.IdLocation);

                entity.ToTable("tbl_Location");

                entity.Property(e => e.IdLocation)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Location");

                entity.Property(e => e.City)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Postalcode)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Street)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblPerson>(entity =>
            {
                entity.HasKey(e => e.IdPerson);

                entity.ToTable("tbl_Person");

                entity.Property(e => e.IdPerson)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Person");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("EMail");

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblProject>(entity =>
            {
                entity.HasKey(e => e.IdProject);

                entity.ToTable("tbl_Project");

                entity.Property(e => e.IdProject)
                    .ValueGeneratedNever()
                    .HasColumnName("ID_Project");

                entity.Property(e => e.IdClient).HasColumnName("ID_Client");

                entity.Property(e => e.ProjectDescription).IsUnicode(false);

                entity.Property(e => e.ProjectName)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.ProjectNumber)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.IdClientNavigation)
                    .WithMany(p => p.TblProjects)
                    .HasForeignKey(d => d.IdClient)
                    .HasConstraintName("FK_tbl_Project_tbl_Client");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
