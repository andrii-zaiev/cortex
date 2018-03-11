using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Cortex.DataAccess.Migrations
{
    public partial class User_model_was_modified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salt",
                table: "Users");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_UserName",
                table: "Users",
                column: "UserName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_UserName",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Salt",
                table: "Users",
                nullable: false,
                defaultValue: "");
        }
    }
}
