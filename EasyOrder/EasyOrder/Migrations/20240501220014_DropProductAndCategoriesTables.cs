using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EasyOrder.Migrations
{
    /// <inheritdoc />
    public partial class DropProductAndCategoriesTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Categories");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
