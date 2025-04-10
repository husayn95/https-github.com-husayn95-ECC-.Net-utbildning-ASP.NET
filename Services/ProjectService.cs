using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectManagement2.Entities;
using ProjectManagement2.Models;
using ProjectManagement2.Repositories;

namespace ProjectManagement2.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;
    private readonly ICustomerRepository _customerRepository;

    public ProjectService(IProjectRepository projectRepository, ICustomerRepository customerRepository)
    {
        _projectRepository = projectRepository;
        _customerRepository = customerRepository;
    }

    public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
    {
        var projects = await _projectRepository.GetAllAsync();
        return projects.Select(MapToDto);
    }

    public async Task<ProjectDto?> GetProjectByIdAsync(int id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        return project != null ? MapToDto(project) : null;
    }

    public async Task<ProjectDto?> GetProjectByNumberAsync(string projectNumber)
    {
        var project = await _projectRepository.GetByProjectNumberAsync(projectNumber);
        return project != null ? MapToDto(project) : null;
    }

    public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto projectDto)
    {
        // Validate customer exists
        var customer = await _customerRepository.GetByIdAsync(projectDto.CustomerId);
        if (customer == null)
            throw new KeyNotFoundException($"Customer with ID {projectDto.CustomerId} not found");

        var project = new Project
        {
            Name = projectDto.Name,
            Service = projectDto.Service,
            TotalPrice = projectDto.TotalPrice,
            CustomerId = projectDto.CustomerId
        };

        var result = await _projectRepository.AddAsync(project);
        return MapToDto(result);
    }

    public async Task<ProjectDto> UpdateProjectAsync(int id, UpdateProjectDto projectDto)
    {
        // Get existing project to preserve ProjectNumber
        var existingProject = await _projectRepository.GetByIdAsync(id);
        if (existingProject == null)
            throw new KeyNotFoundException($"Project with ID {id} not found");

        // Validate customer exists
        var customer = await _customerRepository.GetByIdAsync(projectDto.CustomerId);
        if (customer == null)
            throw new KeyNotFoundException($"Customer with ID {projectDto.CustomerId} not found");

        existingProject.Name = projectDto.Name;
        existingProject.Service = projectDto.Service;
        existingProject.TotalPrice = projectDto.TotalPrice;
        existingProject.CustomerId = projectDto.CustomerId;

        var result = await _projectRepository.UpdateAsync(existingProject);
        return MapToDto(result);
    }

    public async Task<bool> DeleteProjectAsync(int id)
    {
        return await _projectRepository.DeleteAsync(id);
    }

    private static ProjectDto MapToDto(Project project)
    {
        return new ProjectDto
        {
            Id = project.Id,
            ProjectNumber = project.ProjectNumber,
            Name = project.Name,

            CustomerId = project.CustomerId,
        };
    }
}