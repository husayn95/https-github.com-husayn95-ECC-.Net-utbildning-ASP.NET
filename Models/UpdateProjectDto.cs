using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectManagement2.Entities;

namespace ProjectManagement2.Models;

public class UpdateProjectDto
{
    public string Name { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string ProjectManager { get; set; } = null!;
    public string Service { get; set; } = null!;
    public decimal TotalPrice { get; set; }
    public ProjectStatus Status { get; set; }
    public int CustomerId { get; set; }
}