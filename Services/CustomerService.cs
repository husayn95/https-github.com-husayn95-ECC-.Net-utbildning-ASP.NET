using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectManagement2.Entities;
using ProjectManagement2.Models;
using ProjectManagement2.Repositories;

namespace ProjectManagement2.Services;


public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _customerRepository;

    public CustomerService(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<IEnumerable<CustomerDto>> GetAllCustomersAsync()
    {
        var customers = await _customerRepository.GetAllAsync();
        return customers.Select(MapToDto);
    }

    public async Task<CustomerDto?> GetCustomerByIdAsync(int id)
    {
        var customer = await _customerRepository.GetByIdAsync(id);
        return customer != null ? MapToDto(customer) : null;
    }

    public async Task<CustomerDto> CreateCustomerAsync(CustomerDto customerDto)
    {
        var customer = MapToEntity(customerDto);
        var result = await _customerRepository.AddAsync(customer);
        return MapToDto(result);
    }

    public async Task<CustomerDto> UpdateCustomerAsync(int id, CustomerDto customerDto)
    {
        var customer = MapToEntity(customerDto);
        customer.Id = id;
        var result = await _customerRepository.UpdateAsync(customer);
        return MapToDto(result);
    }

    public async Task<bool> DeleteCustomerAsync(int id)
    {
        return await _customerRepository.DeleteAsync(id);
    }

    private static CustomerDto MapToDto(Customer customer)
    {
        return new CustomerDto
        {
            Id = customer.Id,
            Name = customer.Name,
        };
    }

    private static Customer MapToEntity(CustomerDto customerDto)
    {
        return new Customer
        {
            Id = customerDto.Id,
            Name = customerDto.Name,

        };
    }
}