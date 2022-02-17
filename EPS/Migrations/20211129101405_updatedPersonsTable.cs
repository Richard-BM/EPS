using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EPS.Migrations
{
    public partial class updatedPersonsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_Client",
                columns: table => new
                {
                    ID_Client = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    Name = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Client", x => x.ID_Client);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Location",
                columns: table => new
                {
                    ID_Location = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    Name = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    Street = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    Postalcode = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    City = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Location", x => x.ID_Location);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Person",
                columns: table => new
                {
                    ID_Person = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    Firstname = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    Lastname = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    EMail = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Person", x => x.ID_Person);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Project",
                columns: table => new
                {
                    ID_Project = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    ID_Client = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectName = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    ProjectNumber = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false),
                    ProjectDescription = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Project", x => x.ID_Project);
                    table.ForeignKey(
                        name: "FK_tbl_Project_tbl_Client",
                        column: x => x.ID_Client,
                        principalTable: "tbl_Client",
                        principalColumn: "ID_Client",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tbl_Appointment",
                columns: table => new
                {
                    ID_Appointment = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    ID_Person = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_Location = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ID_Project = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_Appointment", x => x.ID_Appointment);
                    table.ForeignKey(
                        name: "FK_tbl_Appointment_tbl_Location",
                        column: x => x.ID_Location,
                        principalTable: "tbl_Location",
                        principalColumn: "ID_Location",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_tbl_Appointment_tbl_Person",
                        column: x => x.ID_Person,
                        principalTable: "tbl_Person",
                        principalColumn: "ID_Person",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_tbl_Appointment_tbl_Project",
                        column: x => x.ID_Project,
                        principalTable: "tbl_Project",
                        principalColumn: "ID_Project",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Appointment_ID_Location",
                table: "tbl_Appointment",
                column: "ID_Location");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Appointment_ID_Person",
                table: "tbl_Appointment",
                column: "ID_Person");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Appointment_ID_Project",
                table: "tbl_Appointment",
                column: "ID_Project");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_Project_ID_Client",
                table: "tbl_Project",
                column: "ID_Client");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_Appointment");

            migrationBuilder.DropTable(
                name: "tbl_Location");

            migrationBuilder.DropTable(
                name: "tbl_Person");

            migrationBuilder.DropTable(
                name: "tbl_Project");

            migrationBuilder.DropTable(
                name: "tbl_Client");
        }
    }
}
