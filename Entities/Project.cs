using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagement2.Entities;
public enum ProjectStatus
{
    NotStarted,
    InProgress,
    Completed
}

public class Project
{
    public int Id { get; set; }
    public string ProjectNumber { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Service { get; set; } = null!;
    public decimal TotalPrice { get; set; }

    // Foreign key
    public int CustomerId { get; set; }

    // Navigation property
    public Customer Customer { get; set; } = null!;
}