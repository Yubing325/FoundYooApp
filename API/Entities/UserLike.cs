namespace API.Entities
{
    public class UserLike //Join Table for AppUser and Like Table
    {
        public AppUser SourceUser { get; set; } //User that is liking others

        public int SourceUserId { get; set; }

        public AppUser LikedUser { get; set; } //User that is being liked by others

        public int LikedUserId { get; set; }

    }
}