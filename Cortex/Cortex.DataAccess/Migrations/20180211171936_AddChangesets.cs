using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Cortex.DataAccess.Migrations
{
    public partial class AddChangesets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NetworkChangesets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    AuthorId = table.Column<Guid>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    Date = table.Column<DateTimeOffset>(nullable: false),
                    NetworkId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NetworkChangesets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NetworkChangesets_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NetworkChangesets_Networks_NetworkId",
                        column: x => x.NetworkId,
                        principalTable: "Networks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NetworkChangesets_AuthorId",
                table: "NetworkChangesets",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_NetworkChangesets_NetworkId",
                table: "NetworkChangesets",
                column: "NetworkId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NetworkChangesets");
        }
    }
}
