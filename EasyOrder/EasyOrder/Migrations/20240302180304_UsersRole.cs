using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyOrder.Migrations
{
    /// <inheritdoc />
    public partial class UsersRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userName",
                table: "Users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "userName",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
