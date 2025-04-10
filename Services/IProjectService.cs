using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectManagement2.Models;

namespace ProjectManagement2.Services;

public interface IProjectService
{
    Task<IEnumerable<ProjectDto>> GetAllProjectsAsync();
    Task<ProjectDto?> GetProjectByIdAsync(int id);
    Task<ProjectDto?> GetProjectByNumberAsync(string projectNumber);
    Task<ProjectDto> CreateProjectAsync(CreateProjectDto projectDto);
    Task<ProjectDto> UpdateProjectAsync(int id, UpdateProjectDto projectDto);
    Task<bool> DeleteProjectAsync(int id);
}
