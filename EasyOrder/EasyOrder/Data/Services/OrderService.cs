using EasyOrder.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            return _context.Orders
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToList();
        }

        public Order GetOrderById(int id)
        {
            return _context.Orders
                           .Include(o => o.OrderProducts)
                           .ThenInclude(op => op.Product)
                           .FirstOrDefault(o => o.Id == id);
        }

        public async Task<Order> AddOrder(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));

            // Step 1: Add the Order object itself to the Orders table
            _context.Orders.Add(order);

            // Step 2: Save changes to generate an Order ID
            await _context.SaveChangesAsync();

            // Step 3: Handle the OrderProducts
            foreach (var orderProduct in order.OrderProducts)
            {
                // Ensure each orderProduct has the correct OrderId
                orderProduct.OrderId = order.Id;

                var existingOrderProduct = await _context.OrderProducts
                    .FirstOrDefaultAsync(op => op.OrderId == order.Id && op.ProductId == orderProduct.ProductId);

                if (existingOrderProduct != null)
                {
                    // Update quantity if the product already exists in the order
                    existingOrderProduct.Quantity = orderProduct.Quantity;
                }
                else
                {
                    // Add new order-product entry if it doesn't exist
                    _context.OrderProducts.Add(new OrderProduct
                    {
                        OrderId = order.Id,
                        ProductId = orderProduct.ProductId,
                        Quantity = orderProduct.Quantity
                    });
                }
            }

            // Step 4: Save changes to the database for OrderProducts
            await _context.SaveChangesAsync();

            return order;
        }


        public async Task UpdateOrder(Order order)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));

            var existingOrder = await _context.Orders
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(o => o.Id == order.Id);

            if (existingOrder != null)
            {
                // Validate total and waiterId if necessary
                if (order.Total < 0) throw new ArgumentException("Total cannot be negative", nameof(order.Total));
                if (order.WaiterId <= 0) throw new ArgumentException("Invalid waiter ID", nameof(order.WaiterId));

                existingOrder.Total = order.Total;
                existingOrder.WaiterId = order.WaiterId;

                // Remove OrderProducts that are not in the updated order
                var orderProductsToRemove = existingOrder.OrderProducts
                    .Where(op => !order.OrderProducts.Any(o => o.ProductId == op.ProductId))
                    .ToList();

                _context.OrderProducts.RemoveRange(orderProductsToRemove);

                // Update quantities or add new OrderProducts
                foreach (var orderProduct in order.OrderProducts)
                {
                    if (orderProduct.Quantity <= 0)
                        throw new ArgumentException("Quantity must be greater than zero", nameof(orderProduct.Quantity));

                    var existingOrderProduct = existingOrder.OrderProducts
                        .FirstOrDefault(op => op.ProductId == orderProduct.ProductId);

                    if (existingOrderProduct != null)
                    {
                        existingOrderProduct.Quantity = orderProduct.Quantity;
                    }
                    else
                    {
                        orderProduct.OrderId = existingOrder.Id;
                        _context.OrderProducts.Add(orderProduct);
                    }
                }

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException("Order not found");
            }
        }


        public void DeleteOrder(int id)
        {
            var order = _context.Orders
                .Include(o => o.OrderProducts)
                .FirstOrDefault(o => o.Id == id);

            if (order != null)
            {
                _context.OrderProducts.RemoveRange(order.OrderProducts);
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
