using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DataController : ControllerBase
    {
        [HttpGet("admin")]
        [Authorize(Roles = "admin")]
        public IActionResult GetAdminData()
        {
            return Ok("This is data for admins.");
        }

        [HttpGet("post1")]
        [Authorize(Roles = "post1")]
        public IActionResult GetPost1Data()
        {
            return Ok("This is data for post1.");
        }

        [HttpGet("post2")]
        [Authorize(Roles = "post2")]
        public IActionResult GetPost2Data()
        {
            return Ok("This is data for post2.");
        }

        [HttpGet("post3")]
        [Authorize(Roles = "post3")]
        public IActionResult GetPost3Data()
        {
            return Ok("This is data for post3.");
        }

        [HttpGet("post4")]
        [Authorize(Roles = "post4")]
        public IActionResult GetPost4Data()
        {
            return Ok("This is data for post4.");
        }

        [HttpGet("post5")]
        [Authorize(Roles = "post5")]
        public IActionResult GetPost5Data()
        {
            return Ok("This is data for post5.");
        }
    }
}
