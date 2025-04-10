using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectManagement2.Entities;

namespace ProjectManagement2.Repositories;

public interface IProjectRepository
{
    // Task<IEnumerable<Project>> GetAllAsync();
    // Task<Project?> GetByIdAsync(int id);
    // Task<Project?> GetByProjectNumberAsync(string projectNumber);
    // Task<Project> AddAsync(Project project);
    // Task<Project> UpdateAsync(Project project);
    // Task<bool> DeleteAsync(int id);
    // Task<string> GenerateProjectNumberAsync();

    public Task<IEnumerable<Project>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Project?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Project?> GetByProjectNumberAsync(string projectNumber)
    {
        throw new NotImplementedException();
    }

    public Task<Project> AddAsync(Project project)
    {
        throw new NotImplementedException();
    }

    public Task<Project> UpdateAsync(Project project)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<string> GenerateProjectNumberAsync()
    {
        throw new NotImplementedException();
    }
}