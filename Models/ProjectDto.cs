using System;
using System.Collections.Generic;
using ProjectManagement2.Entities;

namespace ProjectManagement2.Models
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string ProjectNumber { get; set; }  // Automatically generated
        public string Name { get; set; }
        public string Status { get; set; }  // e.g., "Not Started", "In Progress", "Completed"
        public decimal TotalPrice { get; set; }
        public int CustomerId { get; set; }

        public Customer Customer { get; set; }


    }

}