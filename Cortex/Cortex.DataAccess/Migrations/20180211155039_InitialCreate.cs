using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Cortex.DataAccess.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NetworkAccesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AccessMode = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NetworkAccesses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Email = table.Column<string>(maxLength: 200, nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: true),
                    PasswordHash = table.Column<string>(nullable: false),
                    Salt = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Networks",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 300, nullable: true),
                    OwnerId = table.Column<Guid>(nullable: false),
                    ReadAccessId = table.Column<Guid>(nullable: false),
                    WriteAccessId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Networks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Networks_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Networks_NetworkAccesses_ReadAccessId",
                        column: x => x.ReadAccessId,
                        principalTable: "NetworkAccesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Networks_NetworkAccesses_WriteAccessId",
                        column: x => x.WriteAccessId,
                        principalTable: "NetworkAccesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NetworkUserAccesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    NetworkAccessId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NetworkUserAccesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NetworkUserAccesses_NetworkAccesses_NetworkAccessId",
                        column: x => x.NetworkAccessId,
                        principalTable: "NetworkAccesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NetworkUserAccesses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Networks_OwnerId",
                table: "Networks",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Networks_ReadAccessId",
                table: "Networks",
                column: "ReadAccessId");

            migrationBuilder.CreateIndex(
                name: "IX_Networks_WriteAccessId",
                table: "Networks",
                column: "WriteAccessId");

            migrationBuilder.CreateIndex(
                name: "IX_NetworkUserAccesses_NetworkAccessId",
                table: "NetworkUserAccesses",
                column: "NetworkAccessId");

            migrationBuilder.CreateIndex(
                name: "IX_NetworkUserAccesses_UserId",
                table: "NetworkUserAccesses",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Networks");

            migrationBuilder.DropTable(
                name: "NetworkUserAccesses");

            migrationBuilder.DropTable(
                name: "NetworkAccesses");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
