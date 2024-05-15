using EasyOrder.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EasyOrder.Data.Services
{
    public class OrderService
    {
        private readonly AppDbContext _context;
        public OrderService(AppDbContext context)
        {
            _context = context;
        }

        public List<Order> GetAllOrders()
        {
            var orders = _context.Orders.ToList();
            return orders;
        }


        public Order GetOrderById(int id)
        {
            return _context.Orders.FirstOrDefault(u => u.Id == id);
        }

        public void AddOrder(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
        }

        public void UpdateOrder(Order order)
        {
            var existingOrder = _context.Orders.FirstOrDefault(u => u.Id == order.Id);
            if (existingOrder != null)
            {
                existingOrder.Products = order.Products;
                existingOrder.Total = order.Total;
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Order not found");
            }
        }

        public void DeleteOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(u => u.Id == id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Order not found");
            }
        }
    }
}