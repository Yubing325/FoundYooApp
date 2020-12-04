using System.Threading.Tasks;
using API.Interfaces;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        public Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            throw new System.NotImplementedException();
        }

        public Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            throw new System.NotImplementedException();
        }
    }
}