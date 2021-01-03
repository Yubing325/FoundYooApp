using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, 
                               AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, 
                               IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserLike> UserLikes { get; set; }        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserLike>()
                   .HasKey(key => new {key.SourceUserId, key.LikedUserId});
            
            builder.Entity<UserLike>()
                    .HasOne(s => s.SourceUser)
                    .WithMany(l => l.LikedUsers)
                    .HasForeignKey(s => s.SourceUserId)
                    .OnDelete(DeleteBehavior.Cascade); // Tip: DeleteBehavior.NoAction for SQL Server

            builder.Entity<UserLike>()
                    .HasOne(s => s.LikedUser)
                    .WithMany(l => l.LikedByUsers)
                    .HasForeignKey(s => s.LikedUserId)
                    .OnDelete(DeleteBehavior.Cascade); // Tip: DeleteBehavior.NoAction for SQL Server
            builder.Entity<AppUser>()
                    .HasMany(ur => ur.UserRoles)
                    .WithOne(u => u.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            builder.Entity<AppRole>()
                    .HasMany(ur => ur.UserRoles)
                    .WithOne(r => r.Role)
                    .HasForeignKey(r => r.RoleId)
                    .IsRequired();
                    

        }
    }
}