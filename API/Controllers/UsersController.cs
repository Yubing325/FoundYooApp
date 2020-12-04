using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.Data.Interfaces;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;


        }

        [Authorize]
        [HttpGet]

        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        // [Authorize]
        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUser(int id)
        // {
        //     var user = await _userRepository.GetUserByIdAsync(id);

        //     if (user == null) return BadRequest("this user doesn't exisit");

        //     return user;
        // }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto updateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(username)) return BadRequest("this user doesn't exisit");

            await _userRepository.UpdateMember(username, updateDto);

            if (await _userRepository.SaveAllAsync()) 
                return NoContent();

             return BadRequest("Failed to update user");

        }

        
    }
}